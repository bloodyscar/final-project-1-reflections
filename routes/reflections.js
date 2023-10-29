var express = require('express');
var router = express.Router();
const reflectionsController = require('../controllers/ReflectionsController')
const auth = require('../middleware/auth')


router.post('/', auth,reflectionsController.create);


module.exports = router;