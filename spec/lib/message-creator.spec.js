'use strict';

var expect = require('chai').expect
  , app = require('../../app.js')
  , messageCreator = require('../../lib/message-creator')
  , cheerio = require('cheerio');

describe('message-creator', function () {
  describe('#create', function () {
    context('when options contains the command "help"', function () {
      it('responds with help instructions', function () {
        var response = messageCreator.create({ command: 'help', tag: '' });
        var $ = cheerio.load(response);

        expect($('Response Message').text()).to.contain('To subscribe send "movie name"');
      });
    });

    context('when options contains the command "subscribe"', function () {
      it('responds with subscription confirmation', function () {
        var response = messageCreator.create({ command: 'subscribe', tag: 'han_solo_spinoff' });
        var $ = cheerio.load(response);

        expect($('Response Message').text()).to.contain('You have been subscribed');
      });
    });

    context('when options contains the command "unsub"', function () {
      it('responds with unsubscription confirmation', function () {
        var response = messageCreator.create({ command: 'unsub', tag: 'han_solo_spinoff' });
        var $ = cheerio.load(response);

        expect($('Response Message').text()).to.contain('You have been unsubscribed');
      });
    });
  });
});
