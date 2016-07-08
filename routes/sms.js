var express = require('express')
  , router = express.Router()
  , requestProcessor = require('../lib/request-processor');

// POST: /sms
router.post('/', function(req, res, next) {
  res.type('text/xml');
  res.send(requestProcessor.process(req.body));
});

module.exports = router;
