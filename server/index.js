require('dotenv').config()
const PORT = process.env.PORT;
const express = require('express')
const app = express()
const router = require('./routes/routes')
const bodyParser = require('body-parser')

app.use(bodyParser.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`NEXT app listening on port ${PORT}`)
});
