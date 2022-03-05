export interface User {
  userName:String,
  email:String,
  password:String,
  address: {
    country:String,
    city:String,
    street:String,
    homeNum: String,
    zip:String,
  }
}

export interface LoginData {
  password:String,
  email:String,
}