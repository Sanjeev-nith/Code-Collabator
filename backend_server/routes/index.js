const express = require('express');
const authRoutes = require('./authRoutes');
const codeCompileRoutes = require('./codeCompileRoutes');
const userRoutes = require('./userRoutes');

const router = express.Router();

router.get('/ping', (req, res) => res.send('OK'));

router.use('/auth', authRoutes);
router.use('/users', userRoutes);
router.use('/code', codeCompileRoutes);

module.exports = router;