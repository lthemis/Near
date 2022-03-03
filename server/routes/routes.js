const express = require('express')
const router = express.Router()
const {addItem, getItem, modifyItem, deleteItem, getItems} = require('../controllers/itemController.js');
const {addUser, removeUser, getUser} = require('../controllers/userController');

router.get('/', (req, res) => {
  res.send('Hello World!')
});


// Users
router.post('/addUser', addUser);

// router.post('/removeUser', removeUser);

router.get('./getUser', getUser);

// // Single item
router.post('/addItem', addItem);

// router.get('/getItem:id', getItem);

// router.put('/modifyItem', modifyItem)

// router.delete('/deleteItem:id', deleteItem)

// // Multiple items
router.get('/getItems', getItems);


module.exports = router;