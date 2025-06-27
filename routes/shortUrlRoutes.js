const express = require('express');
const router = express.Router();
const controller = require('../controllers/urlController');



router.post('/shorturls', controller.createShortUrl);
router.get('/shorturls/:shortcode', controller.getStats);
router.get('/:shortcode', controller.redirectToOriginal); // keep this public

module.exports = router;
