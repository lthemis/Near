const mongoose = require('mongoose');
require('dotenv').config({path: __dirname + '/server/.env'});
const db = process.env.DB_MONGO_HOST
console.log(__dirname);
// const db = process.env.DB_docker

// mongoose.connect(`mongodb://localhost:27017/${db}`);
mongoose.connect(db);


mongoose.connection.on('error', function() {
  console.log('Database not running');
});

mongoose.connection.on('open', function() {
  console.log('database running');
})

module.exports = mongoose;