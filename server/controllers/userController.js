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
        .send({ error: 'User already exists' })
        .end();

    const {latitude, longitude} = await forwardGeocoding(user.address);
    user.location = {latitude: latitude, longitude:longitude}
    
    const hashedPassword = await bcrypt.hash(user.password, saltRounds)
    const userEncrypted = {
      ...user, password: hashedPassword
    }
    const result = await UserModel.create(userEncrypted)
    req.session.uid = result._id;
    // res.header("Access-Control-Allow-Origin", "http://localhost:3001");
    // res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res
      .status(201)
      .send({data: result})
      .end()
  } catch (e) {
    res
      .status(400)
      .send({error: 'Could not create user'})
      .end()
  }
}

const removeUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findByIdAndRemove(userId);
    res
      .status(200)
      .send({data: user})
      .end();
  } 
  catch (e) {
    res
      .status(500)
      .send({error: e})
      .end();
  }
}

const modifyUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const modifiedUser = req.body
    const user = await UserModel.findByIdAndUpdate(userId, modifiedUser);
    res
      .status(200)
      .send({data:user})
      .end();
  } 
  catch (e) {
    res
      .status(500)
      .send({error:e})
      .end();
  }
}

const getUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    res
      .status(200)
      .send({data: user})
      .end();
  } 
  catch (e) {
    res
      .status(500)
      .send({error: e})
      .end();
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({email: email});
    const validatedPass = await bcrypt.compare(password, user.password)
    if (!validatedPass) throw new Error()
    req.session.uid = user._id;
    res
      .status(200)
      .send({data: user})
      .end()
  } catch(e) {
    console.log(e);
    res
      .status(401)
      .send({ error:'Username or password is incorrect' })
      .end()
  }
}

const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      res
        .status(500)
        .send({error: 'Could not log out, please try again'})
        .end()
    } else {
      res.clearCookie('sid');
      res.status(200).send({data: 'Logout successful'})
      .end()
    }
  })
}

module.exports = {addUser, removeUser, getUser, modifyUser, login, logout};