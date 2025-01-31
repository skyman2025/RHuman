const express = require('express');
const router = express.Router();
const professionsController = require('../controllers/professionsController');

//API profesiones
router.get('/',professionsController.renderList);

module.exports = router;