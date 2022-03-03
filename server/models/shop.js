const mongoose = require('./index')
const { Schema } = mongoose;
// const MapUserSchema = new mongoose.Schema({
//   email: {type: String},
//   userName: {type: String},
//   userId: {type: Object}
// })

const ItemSchema = new Schema({
  itemName: {type: String, required: true},
  itemDesc: {type: String, required: true},
  itemPrice: {type: String, required: true},
  location: {
    longitude: {type: Number},
    latitude: {type: Number},
  },
  // seller: MapUserSchema,
  // buyer: MapUserSchema,
  sellerId:{type: mongoose.ObjectId},
  buyerId: {type: mongoose.ObjectId}
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
  basket: [ItemSchema],
  offer: [ItemSchema],
  wallet: {
    income: {type: Number, required: true},
    expenses: {type: Number, required: true},
  },
  rating: {type: Number, required: true}
})

const ShopModel = mongoose.model('Shop', UserSchema)

module.exports = ShopModel


// {
//   "userName": "Lukasz",
//   "email": "Tylke",
//   "password": "abc",
//   "address": {
//     "country": "Germany",
//     "city": "Berlin",
//     "street": "Romanshorner Weg",
//     "homeNum": 20,
//     "zip": 13407
//   },
//   "wallet": {
//     "basket": [],
//     "offer": []
//   },
//   "income": 0,
//   "expenses": 0,
//   "rating": 0
// }