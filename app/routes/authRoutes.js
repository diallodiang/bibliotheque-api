const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/authController');

router.post('/register', AuthController.register); // pour créer le premier admin
router.post('/login', AuthController.login);

module.exports = router;
const multer = require('multer');
const upload = multer({ dest: 'uploads/' }); // dossier où stocker images

// POST avec image
router.post('/', upload.single('image'), BookController.createBook);