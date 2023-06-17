const express = require('express');
const passport = require('passport');
const {compileCode} = require('../controllers/codeCompileController');

const router = express.Router();

router.post("/compile", compileCode);

module.exports = router;