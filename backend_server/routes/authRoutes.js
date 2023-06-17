const express = require('express');
const passport = require('passport');
const { googleAuthCallback } = require('../controllers/authControllers');

const router = express.Router();

router.get("/google", passport.authenticate('google',{
    scope: ['profile','email'] // What we want google to return
}));
router.get("/google/callback", passport.authenticate('google'), googleAuthCallback);

module.exports = router;