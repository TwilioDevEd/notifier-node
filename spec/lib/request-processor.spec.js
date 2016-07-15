'use strict';

var expect = require('chai').expect
  , _ = require('underscore')
  , Q = require('q')
  , sinon = require('sinon')
  , mockery = require('mockery')
  , cheerio = require('cheerio');

describe('request-processor', function () {
  var requestProcessor
    , responseMessage
    , createStub
    , deleteStub;

  var requestBody = function (movieName) {
    return {
      Body: movieName,
      From: '+1-415-555-5555'
    };
  };

  var setupMock = function (_movies) {
    var movies = _.isUndefined(_movies) ? ['rogue_one'] : _movies;

    before(function(){
      mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true
      });

      createStub = sinon.stub();
      deleteStub = sinon.stub();
      var subscriberMock = {
        create: createStub,
        delete: deleteStub,
        find: sinon.stub().returns(Q.resolve({
          id: 'ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
          phoneNumber: '+1-415-555-5555',
          movies: movies
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
  };

  describe('#process', function () {
    context('when message contains "help me"', function () {
      setupMock();

      it('responds with help message', function () {
        responseMessage =
          requestProcessor.process(requestBody('Help  me'));

        expect(responseMessage).to.contain('To subscribe');
      });
    });

    context ('when message contains the "movie name"', function () {
      setupMock();

      before(function() {
        responseMessage = requestProcessor.process(requestBody('Han  Solo  Spinoff'));
      });

      it('responds with subscription message', function () {
        expect(responseMessage).to.contain('You have been subscribed');
      });

      it('creates a subscription adding a movie', function() {
        expect(
          createStub.calledWith(
            '+1-415-555-5555', ['rogue_one', 'han_solo_spinoff'])
        ).to.be.true; // jshint ignore:line
      });
    });

    context ('when message contains "unsub movie name"', function () {
      context('when some movie remains', function() {
        setupMock(['han_solo_spinoff', 'rogue_one']);

        before(function() {
          responseMessage = requestProcessor.process(
            requestBody('unsub rogue one'));
        });

        it('responds with unsubscription message', function () {
          expect(responseMessage).to.contain('You have been unsubscribed');
        });

        it('creates a subscriptor without the removed movie', function() {
          expect(
            createStub.calledWith('+1-415-555-5555', ['han_solo_spinoff'])
          ).to.be.true; // jshint ignore:line
        });
      });

      context('when no movie remains', function() {
        setupMock();

        before(function() {
          responseMessage = requestProcessor.process(
            requestBody('unsub rogue one'));
        });

        it('responds with unsubscription message', function () {
          expect(responseMessage).to.contain('You have been unsubscribed');
        });

        it('deletes the subscriptor', function() {
          expect(
            deleteStub.calledWith('ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
          ).to.be.true; // jshint ignore:line
        });
      });
    });

    context ('when message contains an unknown movie', function () {
      setupMock();

      it('responds with a suggestion message', function () {
        responseMessage = requestProcessor.process(
          requestBody('unsub phantom menace'));

        expect(responseMessage).to.contain('supported movies');
      });
    });
  });
});
