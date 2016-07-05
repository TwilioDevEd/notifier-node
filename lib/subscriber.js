'use strict';

var create = function(subscriberPhoneNumber, movies) {
  var accountSid = process.env.TWILIO_ACCOUNT_SID
    , authToken = process.env.TWILIO_AUTH_TOKEN
    , notificationServiceSid = process.env.TWILIO_NOTIFICATION_SERVICE_SID;

  var client = require('twilio')(accountSid, authToken)
    , service = client.notifications.v1.services(notificationServiceSid);

  // Create a binding for a user that will be updated when details for Rogue
  // One or the Han Solo spinoff are revealed
  service.bindings.create({
    endpoint: `${subscriberPhoneNumber}:sms`,
    identity: subscriberPhoneNumber,
    bindingType: 'sms',
    address: subscriberPhoneNumber,
    tag: movies
  }).catch(function(error) {
    console.log(error);
  });
};

module.exports.create = create;
