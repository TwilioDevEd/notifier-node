'use strict';

var twilio = require('twilio');

var responses = {
  help: [
    'May the Force be with you!',
    'To subscribe send "movie name".',
    'To unsubscribe send "unsub movie name" (without the quotes.)'
  ].join('\n'),
  subscribe: 'You have been subscribed',
  unsub: 'You have been unsubscribed'
};

var create = function (options) {
  return new twilio.TwimlResponse().message(
    responses[options.command]
  ).toString();
};

module.exports.create = create;
