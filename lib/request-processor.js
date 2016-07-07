'use strict';

var parser = require('./parser')
  , subscriber = require('./subscriber')
  , messageCreator = require('./message-creator');

var subscriptionHandlers = {
  subscribe: function (phoneNumber, movies) {
    subscriber.create(phoneNumber, movies);
  }
};

var process = function(req) {
  var message = req.body.Body
    , phoneNumber = req.body.From;

  var options = parser.parse(message);
  subscriptionHandlers[options.command](phoneNumber, options.tag);

  return messageCreator.create(options);
};

module.exports.process = process;
