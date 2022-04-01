var express = require('express');
var router = express.Router();
var userController = require('../controllers/user');
router.get('/', userController.createTable);
router.post('/', userController.RegisterUser);
router.post('/login', userController.loginUser);
router.get('/getusers', userController.getUsers);
module.exports = router;
