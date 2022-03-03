const ShopModel = require('../models/shop');

async function addItem (req, res) {
  console.log(req.body);
  try {
    const item = req.body;
    const result = await ShopModel.findByIdAndUpdate(item.sellerId,{$push: {offer: item}});
    res.status(201).send(result)
  } catch(e) {
    console.log(e);
    res.status(500).end()
  }
}

function getItem(req, res){

}

function modifyItem(req, res){

}

function deleteItem(req, res){

}

async function getItems(req, res){
  try{
    const result = await ShopModel.find({})
    const items = result.map(user => user.offer).flat();

    res.status(200).send(items);
  } catch (e) {
    console.log(e);
  }
};

module.exports = {addItem, getItem, modifyItem, deleteItem, getItems }


