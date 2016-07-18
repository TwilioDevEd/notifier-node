var _ = require('underscore');

var config = {
  secret: process.env.APP_SECRET,

  // Your Twilio account SID and auth token, both found at:
  // https://www.twilio.com/user/account
  accountSid: process.env.TWILIO_ACCOUNT_SID,
  authToken: process.env.TWILIO_AUTH_TOKEN,
  phoneNumber: process.env.TWILIO_NUMBER,
  notificationServiceSid: process.env.TWILIO_NOTIFICATION_SERVICE_SID
};

var isUnconfigured = _.every(_.values(config), function(value) {
  return _.isUndefined(value);
});

if (isUnconfigured) {
  throw new Error(
    'TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN, TWILIO_NUMBER, and TWILIO_NOTIFICATION_SERVICE_SID must be set');
}

module.exports = config;
