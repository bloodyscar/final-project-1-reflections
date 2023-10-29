var express = require('express');
var router = express.Router();
const usersController = require('../controllers/UserController')

/* GET users listing. */
router.post('/register', usersController.register);

module.exports = router;
