'use strict';

var parser = require('./parser')
  , subscriber = require('./subscriber')
  , messageCreator = require('./message-creator');

var subscriptionHandlers = {
  subscribe: function (phoneNumber, movies) {
    subscriber.create(phoneNumber, movies);
  }
};

var process = function(requestBody) {
  var message = requestBody.Body
    , phoneNumber = requestBody.From;

  var options = parser.parse(message)
    , handler = subscriptionHandlers[options.command];

  if (handler) {
    handler(phoneNumber, options.tag);
  }

  return messageCreator.create(options);
};

module.exports.process = process;
