
const UserSchema = new moongose.Schema({
  userName: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  address: {type: String, required: true},
  country: {type: String, required: true},
  city: {type: String, required: true},
  street: {type: String, required: true},
  homeNum: {type: Number, required: true},
  zip: {type: Number, required: true},
  basket: [ItemSchema],
  offer: [ItemSchema],
  income: {type: Number, required: true},
  expenses: {type: Number, required: true},
  rating: {type: Number, required: true}
})

const ItemSchema = new moongose.Schema({
  itemName: {type: String, required: true},
  itemDesc: {type: String, required: true},
  itemPrice: {type: String, required: true},
  longitude: {type: Number},
  latitude: {type: Number},
  seller: UserSchema,
  buyer: UserSchema
})

const ItemsSchema = new moongose.Schema({
  items: [ItemSchema]
}) 