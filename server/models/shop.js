const mongoose = require('./index')
const { Schema } = mongoose;

const ItemSchema = new Schema({
  itemName: {type: String, required: true},
  itemDesc: {type: String, required: true},
  itemPrice: {type: String, required: true},
  location: {
    longitude: {type: Number},
    latitude: {type: Number},
  },
  sellerId:{type: mongoose.ObjectId},
  buyerId: {type: mongoose.ObjectId},
})

const UserSchema = new Schema({
  userName: {type: String},
  email: {type: String, required: true},
  password: {type: String, required: true},
  address: {
    country: {type: String, required: true},
    city: {type: String, required: true},
    street: {type: String, required: true},
    homeNum: {type: Number, required: true},
    zip: {type: Number, required: true},
  },
  wallet: {
    income: {type: Number, required: true},
    expenses: {type: Number, required: true},
  },
  rating: {type: Number, required: true}
})

const ItemModel = mongoose.model('Item', ItemSchema)
const UserModel = mongoose.model('Shop', UserSchema)

module.exports = { UserModel, ItemModel }

