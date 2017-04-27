'use strict';

var config = require('../config');

module.exports.service = function() {
  var client = require('twilio')(config.accountSid, config.authToken);

  return client.notify.v1.services(config.notificationServiceSid);
};
