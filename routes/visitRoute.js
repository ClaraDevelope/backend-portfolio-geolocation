const express = require('express');
const router = express.Router();
const { registerVisit, createVisit } = require('../controllers/visitController');

router.get('/register-visit', registerVisit);
router.post('/', createVisit);

module.exports = router;
