const ShopModel = require('../models/shop');

 const addUser = async (req, res) => {
  try {
    console.log('addUserController', req.body);
    const user = req.body;
    // const result = await ShopModel.create({user}, function (err, user){
    //   console.log(err);
    // })
    console.log('user', user);
    const result = await ShopModel.create(user)
    // console.log(user);
    // res.status(201)
    res.send('te')
  } catch (e) {
    console.log(ShopModel);
    console.log(e);
    res.status(500).end()
  }
}

const removeUser = (req, res) => {

}

const getUser = (req, res) => {
  
}

module.exports = {addUser, removeUser, getUser};