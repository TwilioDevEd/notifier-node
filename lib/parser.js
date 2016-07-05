'use strict';

var Command = {
  build: function (message) {
    var command = 'subscribe', tag = '';

    if (this.isHelp(message)) {
      return { command: 'help', tag: tag }
    }

    if (this.isUnsub(message)) {
      var movieName = this.extractMovieName(message);
      return { command: 'unsub', tag: this.convertToTag(movieName) };
    }

    var movieName = message;
    return { command: 'subscribe', tag: this.convertToTag(movieName) };
  },

  isHelp: function (message) {
    return message === 'help';
  },

  isUnsub: function (message) {
    return message.startsWith('unsub');
  },

  extractMovieName: function (message) {
    return message.replace(/unsub\s+/g,'');
  },

  convertToTag: function (movieName) {
    return movieName.toLowerCase().split(/\s/).join('_');
  }
};

var parse = function(message) {
  return Command.build(message);
};

module.exports.parse = parse;
