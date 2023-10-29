var express = require('express');
var router = express.Router();
const reflectionsController = require('../controllers/ReflectionsController')
const auth = require('../middleware/auth')


router.post('/', auth, reflectionsController.create);
router.get('/', auth, reflectionsController.get);
router.delete('/delete', auth, reflectionsController.delete);
router.put('/edit', auth, reflectionsController.edit);


module.exports = router;