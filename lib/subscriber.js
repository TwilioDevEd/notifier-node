'use strict';

var Twilio = require('twilio');

module.exports = {
  list: function() {
    return service().bindings.list()
    .then(function(response) {
      return response.map(function(res) {
        return { id: res.sid, phone: res.address, tags: res.tags };
      });
    }).catch(function(error) {
      console.log(error);
    });
  },

  create: function(subscriberPhoneNumber, movies) {
    // Create a binding for a user that will be updated when details for
    // movie are revealed
    service().bindings.create({
      endpoint: `${subscriberPhoneNumber}:sms`,
      identity: subscriberPhoneNumber,
      bindingType: 'sms',
      address: subscriberPhoneNumber,
      tag: movies
    }).catch(function(error) {
      console.log(error);
    });
  }
};


var service = function() {
  var accountSid = process.env.TWILIO_ACCOUNT_SID
    , authToken = process.env.TWILIO_AUTH_TOKEN
    , notificationServiceSid = process.env.TWILIO_NOTIFICATION_SERVICE_SID;

  var client = require('twilio')(accountSid, authToken);
  return client.notifications.v1.services(notificationServiceSid);
};
