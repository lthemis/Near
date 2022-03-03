const {UserModel} = require('../models/shop');

 const addUser = async (req, res) => {
  try {
    const user = req.body;
    const result = await UserModel.create(user)
    res.status(201).send(result)
  } catch (e) {
    console.log(ShopModel);
    console.log(e);
    res.status(500).end()
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

module.exports = {addUser, removeUser, getUser, modifyUser};