const express = require('express')
const router = express.Router()
const {addItem, getItem, modifyItem, deleteItem, getItems} = require('../controllers/itemController.js');
const {addUser, removeUser, getUser, modifyUser, login, logout} = require('../controllers/userController');

router.get('/', (req, res) => {
  res.send('Hello World!')
});

// User routes
router.post('/addUser', addUser);

router.post('/login', login)

router.post('/logout', logout)

router.post('/removeUser/:id', removeUser);

router.put('/modifyUser/:id', modifyUser);

router.get('/getUser/:id', getUser);

// // Item routes
router.post('/addItem', addItem);

router.get('/getItem/:id', getItem);

router.put('/modifyItem/:id', modifyItem)

router.delete('/deleteItem/:id', deleteItem)

router.get('/getItems', getItems);

router.all('*', (req, res) => {
  res.status(404).send("404 - Not found")
})

module.exports = router;