'use strict';

var _ = require('underscore')
  , parser = require('./parser')
  , Subscriber = require('./subscriber')
  , messageCreator = require('./message-creator');

var subscriptionHandlers = {
  subscribe: function (phoneNumber, movie) {
    Subscriber.find(phoneNumber)
      .then(function(subscriber) {
        if (subscriber) {
          var movies = addMovie(subscriber.movies, movie);
          Subscriber.create(phoneNumber, movies);
        }
      });
  },

  unsub: function (phoneNumber, movie) {
    Subscriber.find(phoneNumber)
      .then(function(subscriber) {
        if (subscriber) {
          var movies = deleteMovie(subscriber.movies, movie);
          Subscriber.create(phoneNumber, movies);
        }
      });
  }
};

var addMovie = function(movies, movie) {
  // The subscriber is already subscribed to this movie.
  if (_.contains(movies, movie)) {
    return movies;
  }

  return movies.concat(movie);
};

var deleteMovie = function(movies, movie) {
  // The subscriber is already subscribed to this movie.
  if (_.contains(movies, movie)) {
    return _.filter(movies, function(_movie) {
      return movie !== _movie;
    });
  }

  return movies;
};

var process = function(requestBody) {
  var message = requestBody.Body
    , phoneNumber = requestBody.From;

  var options = parser.parse(message)
    , handler = subscriptionHandlers[options.command];

  if (handler) {
    handler(phoneNumber, options.tag);
  }

  return messageCreator.create(options);
};

module.exports.process = process;
