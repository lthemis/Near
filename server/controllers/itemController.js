const { isRequired } = require('nodemon/lib/utils');
const { UserModel, ItemModel } = require('../models/shop');
const { forwardGeocoding } = require('../services/geocodingApi');

async function addItem (req, res) {
  try {
    const item = await req.body;
    const userId = req.body.sellerId
    const user = await UserModel.findById(userId);

    console.log('itemControler', req.body, console.log('user', user));
    const {latitude, longitude} = await forwardGeocoding(user.address);
    item.location = {latitude: latitude, longitude:longitude}

    const result = await ItemModel.create(item);
    res.status(201).send(result)

  } catch(e) {
    console.log(e);
    res.status(500).end()
  }
}

async function getItem(req, res) { 
  try {
    const itemId = req.params.id;
    const result = await ItemModel.findById(itemId);
    res.status(200).send(result)
  } catch (e) {
    console.log(e);
    res.status(500).end()
  }
}

async function modifyItem(req, res){
  try {
    const itemId= req.params.id;
    const newItem = req.body;
    const result = await ItemModel.findByIdAndUpdate(itemId, newItem);
    console.log(result);
    res.status(200).end()
  } catch (e) {
    console.log(e);
    res.status(500).end()
  }
}

async function deleteItem(req, res){
  console.log('reached controller - delete');
  try {
    const itemId= req.params.id;
    const itemData = await ItemModel.findById(itemId);
    const user = await UserModel.findById(itemData.sellerId);
    console.log('del controller', itemData);
    // user.wallet = {income: user.income + itemData.itemPrice}

    user.wallet = user.wallet ? 
      {...user.wallet, income: user.income + itemData.itemPrice}
      : {income: user.income + itemData.itemPrice};
      
    console.log(user);
    // console.log('user', user);
    // const result = await ItemModel.findByIdAndDelete(itemId);
    // console.log(result);
    res.status(200).send('success')
  } catch (e) {
    console.log(e);
    res.status(500).end()
  }
}

async function getItems(req, res){
  try{
    const result = await ItemModel.find({})
    res.status(200).send(result);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {addItem, getItem, modifyItem, deleteItem, getItems }


