module.exports.service = function() {
  var accountSid = process.env.TWILIO_ACCOUNT_SID
    , authToken = process.env.TWILIO_AUTH_TOKEN
    , notificationServiceSid = process.env.TWILIO_NOTIFICATION_SERVICE_SID
    , client = require('twilio')(accountSid, authToken);

  return client.notifications.v1.services(notificationServiceSid);
};
