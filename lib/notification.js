'use strict';

module.exports = {
  list: function() {
    return getService().bindings.list()
    .then(function(response) {
      return response.map(function(res) {
        return { id: res.sid, phone: res.address, tags: res.tags };
      });
    }).catch(function(error) {
      console.log(error);
    });
  },

  create: function(movies, message) {
    var service = getService()
      , twilioNumber = process.env.TWILIO_NUMBER;
    // Send a notification to all users who have subscribed
    // for movies updates.
    service.notifications.create({
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

var getService = function() {
  var accountSid = process.env.TWILIO_ACCOUNT_SID
    , authToken = process.env.TWILIO_AUTH_TOKEN
    , notificationServiceSid = process.env.TWILIO_NOTIFICATION_SERVICE_SID;

  var client = require('twilio')(accountSid, authToken);
  return client.notifications.v1.services(notificationServiceSid);
};
