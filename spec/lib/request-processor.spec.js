'use strict';

var expect = require('chai').expect
  , Q = require('q')
  , sinon = require('sinon')
  , mockery = require('mockery')
  , cheerio = require('cheerio');

describe('request-processor', function () {
  var requestProcessor
    , responseMessage
    , createStub
    , findStub;

  var requestBody = function (movieName) {
    return {
      Body: movieName,
      From: '+1-415-555-5555'
    };
  };

  before(function(){
    mockery.enable({
      warnOnReplace: false,
      warnOnUnregistered: false,
      useCleanCache: true
    });

    createStub = sinon.stub();
    findStub = sinon.stub().returns(Q.resolve(
      {
        id: 'ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        phoneNumber: '+1-415-555-5555',
        movies: ['rogue_one']
      }
    ));
    var subscriberMock = {
      create: createStub,
      find: sinon.stub().returns(Q.resolve({
        id: 'ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
        phoneNumber: '+1-415-555-5555',
        movies: ['rogue_one']
      }))
    };

    // replace the module `subscriber` with a mocked object
    mockery.registerMock('./subscriber', subscriberMock);
    requestProcessor = require('../../lib/request-processor');
  });

  after(function(){
    mockery.deregisterMock('./subscriber');
    mockery.disable();
  });

  describe('#process', function () {
    context('when message contains "help me"', function () {
      it('responds with help message', function (done) {
        responseMessage =
          requestProcessor.process(requestBody('Help  me'));

        expect(responseMessage).to.contain('To subscribe');
        done();
      });
    });

    context ('when message contains the "movie name"', function () {
      before(function() {
        responseMessage = requestProcessor.process(requestBody('Han  Solo  Spinoff'));
      });

      it('responds with subscription message', function (done) {
        expect(responseMessage).to.contain('You have been subscribed');
        done();
      });

      it('creates a subscription', function(done) {
        expect(
          createStub.calledWith(
            '+1-415-555-5555', ['rogue_one', 'han_solo_spinoff'])
        ).to.be.true; // jshint ignore:line
        done();
      });
    });

    context ('when message contains "unsub movie name"', function () {
      it('responds with unsubscription message', function (done) {
        responseMessage =
          requestProcessor.process(requestBody('unsub Han Solo Spinoff'));

        expect(responseMessage).to.contain('You have been unsubscribed');
        done();
      });
    });
  });
});
