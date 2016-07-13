'use strict';

var _ = require('underscore')
  , service = require('./service').service;

module.exports = {
  find: function(phoneNumber) {
    return service().bindings.list()
      .then(function(bindings) {
        return _.map(bindings, function(binding) {
          return {
            id: binding.sid,
            phoneNumber: binding.address,
            movies: binding.tags
          };
        });
      })
      .then(function(subscribers) {
        return _.first(_.filter(subscribers, function(subscriber) {
          return subscriber.phoneNumber === phoneNumber;
        }));
      })
      .catch(function(error) {
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
