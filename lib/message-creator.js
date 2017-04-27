'use strict';

var MessagingResponse = require('twilio').twiml.MessagingResponse;

var responses = {
  help: [
    'May the Force be with you!',
    'To subscribe send the "movie name".',
    'To unsubscribe send "unsub movie name" (without the quotes.)'
  ].join('\n'),
  invalid: [
    'Ups! Unknown movie.',
    'The supported movies are:',
    'Episode VIII',
    'Rogue One',
    'Han Solo Spinoff',
  ].join('\n'),
  subscribe: 'You have been subscribed',
  unsub: 'You have been unsubscribed'
};

var create = function (options) {
  var msgResponse = new MessagingResponse();
  var msg = msgResponse.message();
  msg.body(responses[options.command]);

  return msgResponse.toString();
};

module.exports.create = create;
