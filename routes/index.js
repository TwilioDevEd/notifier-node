var express = require('express')
  , router = express.Router();

// GET: /
router.get('/', function(req, res, next) {
  res.redirect(302, '/notifications/new');
});

module.exports = router;
