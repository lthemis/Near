const {UserModel} = require('../models/shop');
const { forwardGeocoding } = require('../services/geocodingApi');

const bcrypt = require('bcrypt');
const saltRounds = 10;


 const addUser = async (req, res) => {
  try {
    const user = req.body;
    const userCheck = await UserModel.findOne({ email: user.email });
    if (userCheck)
      return res
        .status(409)
        .send({ error: '409', message: 'User already exists' });

    const {latitude, longitude} = await forwardGeocoding(user.address);
    user.location = {latitude: latitude, longitude:longitude}
    
    const hashedPassword = await bcrypt.hash(user.password, saltRounds)
    console.log(hashedPassword);
    const userEncrypted = {
      ...user, password: hashedPassword
    }
    console.log('ue',userEncrypted);
    const result = await UserModel.create(userEncrypted)
    req.session.uid = result._id;
    res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.status(201).send(result)
  } catch (e) {
    console.log(e);
    res.status(400).send({e, message: 'Could not create user'})
  }
}

const removeUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findByIdAndRemove(userId);
    res.status(200).send(user);
  } 
  catch (e) {
    console.log(e);
    res.status(500);
  }
}

const modifyUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const modifiedUser = req.body
    const user = await UserModel.findByIdAndUpdate(userId, modifiedUser);
    console.log(user);
    res.status(200).send(user);
  } 
  catch (e) {
    console.log(e);
    res.status(500);
  }
}

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    res.status(200).send(user);
  } 
  catch (e) {
    console.log(e);
    res.status(500);
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await UserModel.findOne({email: email});
    console.log(user);
    const validatedPass = await bcrypt.compare(password, user.password)
    console.log(validatedPass);
    if (!validatedPass) throw new Error()
    req.session.uid = user._id;
    console.log(req.session);
    res.status(200).send(user)
  } catch(e) {
    console.log(e);
    res
      .status(401)
      .send({ error: '401', message: 'Username or password is incorrect' });
  }
}

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res
        .status(500)
        .send({error, message: 'Could not log out, please try again'})
    } else {
      res.clearCookie('sid');
      res.status(200).send({message: 'Logout successful'})
    }
  })
}

module.exports = {addUser, removeUser, getUser, modifyUser, login, logout};