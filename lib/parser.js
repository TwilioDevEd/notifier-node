'use strict';

var Command = {
  build: function (plainMessage) {
    var command = 'subscribe'
      , tag = ''
      , movieName = '';

    var message = this.normalize(plainMessage);

    if (this.isHelp(message)) {
      return { command: 'help', tag: tag };
    }

    if (this.isUnsub(message)) {
      movieName = this.extractMovieName(message);
      return { command: 'unsub', tag: this.convertToTag(movieName) };
    }

    movieName = message;
    return { command: 'subscribe', tag: this.convertToTag(movieName) };
  },

  isHelp: function (message) {
    return message === 'help me';
  },

  isUnsub: function (message) {
    return message.startsWith('unsub');
  },

  extractMovieName: function (message) {
    return message.replace(/unsub\s+/g,'');
  },

  convertToTag: function (movieName) {
    return movieName.split(/\s/).join('_');
  },

  normalize: function (message) {
    if(message) {
      return message.replace(/\s+/g, ' ')
                    .trim()
                    .toLowerCase();
    }

    return message;
  }
};

var parse = function(message) {
  return Command.build(message);
};

module.exports.parse = parse;
