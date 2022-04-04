require('dotenv').config()
const SERVER_PORT = process.env.PORT;
const express = require('express')
const app = express()
const router = require('./routes/routes')
const bodyParser = require('body-parser')
const cors = require('cors')
const session = require('express-session');
const SECRET = process.env.SECRET
const path = require("path");

const corsConfig = {
  origin: 'http://localhost:3001',
  credentials: true,
}

app.use(cors(corsConfig))
app.use(bodyParser.json());


app.use(
  session({
    name: 'sid',
    saveUninitialized: false,
    resave: false,
    secret: SECRET,
    cookie: {
      maxAge: 1000 * 60 * 60, 
      sameSite: true,
      httpOnly: false,
      secure: false,
    },
  })
);

app.use(router);

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.resolve(__dirname, './build')))
}

app.listen(SERVER_PORT, (err) => {
  if (err) {
    console.log(`😞 Sorry, something went wrong! ${err}`); // eslint-disable-line no-console
  } else {
    console.log(`🚀 Server (sessions) is listening on port ${SERVER_PORT}!`); // eslint-disable-line no-console
  }
});