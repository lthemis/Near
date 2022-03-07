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
    // const itemId= req.params.id;
    const {itemId, buyerId} = req.body;
    console.log('BE',itemId, buyerId);

    // const itemData = await ItemModel.findById(itemId);
    // const user = await UserModel.findById(itemData.sellerId);
    // user.wallet.income = user.wallet.income + Number(itemData.itemPrice);
    // const updatedUser = await UserModel.findByIdAndUpdate(user._id, {wallet:user.wallet})
    // console.log(buyerId);
    res.status(200).send({data: 'success'})
  } catch (e) {
    console.log(e);
    res.status(500).send({error: e})
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


