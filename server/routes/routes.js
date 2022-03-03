const express = require('express')
const router = express.Router()
const {addItem, getItem, modifyItem, deleteItem, getItems} = require('../controllers/itemController.js');
const {addUser, removeUser, getUser, modifyUser} = require('../controllers/userController');

router.get('/', (req, res) => {
  res.send('Hello World!')
});

// User routes
router.post('/addUser', addUser);

router.post('/removeUser/:id', removeUser);

router.put('/modifyUser/:id', modifyUser);

router.get('/getUser/:id', getUser);

// // Single item
router.post('/addItem', addItem);

router.get('/getItem/:id', getItem);

router.put('/modifyItem/:id', modifyItem)

router.delete('/deleteItem/:id', deleteItem)

// // Multiple items
router.get('/getItems', getItems);


module.exports = router;