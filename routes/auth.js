const express = require('express');

const router = express.Router();

const authController = require('../controller/auth')

// something
router.post('/signup',authController.signup)

router.post('/login',authController.login);

router.post('/reset-password',authController.sendResetPasswordLink);

router.get('/reset-password',authController.resetPassword)

module.exports = router;