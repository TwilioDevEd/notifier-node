'use strict';

var service = require('./service').service
  , config = require('../config');

module.exports = {
  create: function(movies, message) {
    var twilioNumber = config.phoneNumber;

    // Send a notification to all users who have subscribed
    // for movies updates.
    service().notifications.create({
      tag: movies,
      body: message,
      sms: JSON.stringify({
        from: twilioNumber
      })
    }).catch(function(error) {
      console.log(error);
    });
  }
};
