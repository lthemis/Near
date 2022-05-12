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
    res
      .status(201)
      .send({data: result})
      .end()
  } catch (e) {
    res
      .status(500)
      .send({error: e})
      .end()
  }
}

async function getItem(req, res) { 
  try {
    const itemId = req.params.id;
    const result = await ItemModel.findById(itemId);
    res
      .status(200)
      .send({data: result})
      .end()
  } catch (e) {
    res
      .status(500)
      .send({error: e})
      .end()
  }
}

async function modifyItem(req, res){
  try {
    const itemId= req.params.id;
    const newItem = req.body;
    const result = await ItemModel.findByIdAndUpdate(itemId, newItem);
    res
      .status(200)
      .end()
  } catch (e) {
    res
      .status(500)
      .send({error: e})
      .end()
  }
}

async function deleteItem(req, res){
  try {
    const {itemId, buyerId} = req.body;
    const itemData = await ItemModel.findById(itemId);
    const seller = await UserModel.findById(itemData.sellerId);
    const buyer = await UserModel.findById(buyerId);
    seller.wallet.income = seller.wallet.income + Number(itemData.itemPrice);
    buyer.wallet.expenses = buyer.wallet.expenses + Number(itemData.itemPrice);
    await UserModel.findByIdAndUpdate(seller._id, {wallet:seller.wallet})
    await UserModel.findByIdAndUpdate(buyer._id, {wallet:buyer.wallet})
    const removedItem = await ItemModel.findByIdAndDelete(itemId)
    
    res
      .status(200)
      .send({data: removedItem})
      .end()
  } catch (e) {
    res
      .status(500)
      .send({error: e})
      .end()
  }
}

async function getItems(req, res){
  try{
    const result = await ItemModel.find({})
    res
      .status(200)
      .send({data: result})
      .end();
  } catch (e) {
    res
      .status(500)
      .send({error: e})
      .end()
  }
};

module.exports = {addItem, getItem, modifyItem, deleteItem, getItems }


