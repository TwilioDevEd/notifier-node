'use strict';

var _ = require('underscore')
  , parser = require('./parser')
  , Subscriber = require('./subscriber')
  , messageCreator = require('./message-creator');

var subscriptionHandlers = {
  subscribe: function (phoneNumber, movie) {
    Subscriber.find(phoneNumber)
      .then(function(subscriber) {
        var movies = addMovie(subscriber, movie);
        Subscriber.create(phoneNumber, movies);
      });
  },

  unsub: function (phoneNumber, movie) {
    Subscriber.find(phoneNumber)
      .then(function(subscriber) {
        if (subscriber) {
          var movies = deleteMovie(subscriber, movie);
          if (_.isEmpty(movies)) {
            Subscriber.delete(subscriber.id);
          } else {
            Subscriber.create(phoneNumber, movies);
          }
        }
      });
  }
};

var addMovie = function(subscriber, movie) {
  if (_.isUndefined(subscriber)) {
    return [movie];
  }

  var movies = subscriber.movies;
  if (_.contains(movies, movie)) { // Already subscribed to this movie.
    return movies;
  }

  return movies.concat(movie);
};

var deleteMovie = function(subscriber, movie) {
  var movies = subscriber.movies;

  if (_.contains(movies, movie)) { // Already subscribed to this movie.
    return _.filter(movies, function(movieToDelete) {
      return movie !== movieToDelete;
    });
  }

  return movies;
};

var process = function(requestBody) {
  var message = requestBody.Body
    , phoneNumber = requestBody.From
    , options = parser.parse(message)
    , handler = subscriptionHandlers[options.command];

  if (handler) {
    handler(phoneNumber, options.tag);
  }

  return messageCreator.create(options);
};

module.exports.process = process;
