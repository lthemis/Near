const { ShopModel, ItemModel } = require('../models/shop');

async function addItem (req, res) {
  try {
    const item = req.body;
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

    console.log(result);
    res.status(200).end()
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
  try {
    const itemId= req.params.id;
    const result = await ItemModel.findByIdAndDelete(itemId);
    console.log(result);
    res.status(200).end()
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


