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
  categories: {
    type: [String],
    enum: ["Food", "Furniture", "Mobility", "Other"],
    required: true
  },
  sellerId:{type: mongoose.ObjectId},
  buyerId: {type: mongoose.ObjectId},
})

const UserSchema = new Schema({
  userName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  address: {
    country: {type: String},
    city: {type: String},
    street: {type: String},
    homeNum: {type: String},
    zip: {type: String},
  },
  location: {
    longitude: {type: Number},
    latitude: {type: Number},
  },
  wallet: {
    income: {type: Number},
    expenses: {type: Number},
  },
  rating: {type: Number}
})

const ItemModel = mongoose.model('Item', ItemSchema)
const UserModel = mongoose.model('Shop', UserSchema)

module.exports = { UserModel, ItemModel }

