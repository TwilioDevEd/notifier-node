var express = require('express')
  , router = express.Router()
  , notification = require('../lib/notification');

// GET: /notifications/new
router.get('/new', function(req, res, next) {
  res.render('notifications', {});
});

// POST: /notifications
router.post('/', function(req, res, next) {
  var message = req.body.message
    , movie = req.body.movie;

  notification.create(movie, message);

  req.flash('success', 'Well done! The force is strong with you.');
  res.redirect(302, '/notifications/new');
});

module.exports = router;
