const express = require('express');
const { getCurrentUser } = require('../controllers/userControllers');

const router = express.Router();

router.get("/current_user", getCurrentUser);

module.exports = router;