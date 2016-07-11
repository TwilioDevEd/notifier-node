var express = require('express')
  , router = express.Router()
  , notification = require('../lib/notification');

// GET: /notifications/new
router.get('/new', function(req, res, next) {
  res.render('dashboard', {});
});

// POST: /notifications
router.post('/', function(req, res, next) {
  var message = req.body.message
    , movie = req.body.movie;

  notification.create(movie, message);
  res.send('');
});

module.exports = router;
