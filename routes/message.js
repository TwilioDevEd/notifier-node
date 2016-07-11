var express = require('express')
  , router = express.Router()
  , requestProcessor = require('../lib/request-processor');

// POST: /message/incoming
router.post('/incoming', function(req, res, next) {
  res.type('text/xml');
  res.send(requestProcessor.process(req.body));
});

module.exports = router;
