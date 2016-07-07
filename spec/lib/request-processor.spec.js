'use strict';

var expect = require('chai').expect
  , requestProcessor = require('../../lib/request-processor')
  , sinon = require('sinon')
  , mockery = require('mockery')
  , cheerio = require('cheerio');

describe('request-processor', function () {
  describe('#process', function () {
    var subscriber = require('../../lib/subscriber')
      , createStub = sinon.stub(subscriber, "create");

    var responseMessage = ''
      , req = function (body) {
                return { Body: body, From: '+1-415-555-5555' };
              };

    before(function (done) {
      mockery.enable();
      mockery.warnOnUnregistered(false);
      mockery.registerMock('subscriber', createStub);
      done();
    });

    after(function (done) {
      mockery.deregisterMock('subscriber');
      mockery.disable();
      done();
    });

    context('when message contains "help"', function () {
      before(function (done) {
        responseMessage = requestProcessor.process(req('help'));
        done();
      });

      it('responds with help message', function (done) {
        var $ = cheerio.load(responseMessage);
        expect($('Response Message').text()).to.contains('To subscribe');
        done();
      });
    });

    context ('when message contains the "movie name"', function () {
      before(function (done) {
        responseMessage =
          requestProcessor.process(req('Han Solo Spinoff'));
        done();
      });

      it('responds with subscription message', function (done) {
        var $ = cheerio.load(responseMessage);
        expect($('Response Message').text()).to.contains('You have been subscribed');
        done();
      });

      it('creates a subscription', function(done) {
        expect(
          createStub.calledWith('+1-415-555-5555', 'han_solo_spinoff')
        ).to.be.true; // jshint ignore:line
        done();
      });
    });

    context ('when message contains "unsub movie name"', function () {
      before(function (done) {
        responseMessage =
          requestProcessor.process(req('unsub Han Solo Spinoff'));
        done();
      });

      it('responds with unsubscription message', function (done) {
        var $ = cheerio.load(responseMessage);
        expect($('Response Message').text()).to.contains(
          'You have been unsubscribed');
        done();
      });
    });
  });
});
