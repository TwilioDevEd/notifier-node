var express = require('express')
  , router = express.Router()
  , router = express.Router()
  , parser = require('../lib/parser')
  , messageCreator = require('../lib/message-creator');

// POST: /sms
router.post('/', function(req, res, next) {
  var command = parser.parse(req.body.Body);

  res.type('text/xml');
  res.send(messageCreator.create(command));
});

module.exports = router;
