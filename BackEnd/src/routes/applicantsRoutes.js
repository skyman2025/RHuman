const express = require('express');
const router = express.Router();
const applicantsController = require('../controllers/applicantsController');

const multer = require('multer');
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, 'public/img/'); 
    },
    filename: function(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + '.' + file.originalname.split('.').pop()); 
    }
});
const upload = multer({ storage: storage });

//API aspirantes
router.get('/',applicantsController.renderList);
router.get('/:id',applicantsController.renderDetail);
router.post('/register', upload.single('Imagen'),applicantsController.renderRegister);
router.post('/login',applicantsController.renderLogin);

module.exports = router;
