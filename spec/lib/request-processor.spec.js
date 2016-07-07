'use strict';

var expect = require('chai').expect
  , requestProcessor = require('../../lib/request-processor')
  , sinon = require('sinon');

describe('subscriber', function () {
  describe('#process', function () {
    var subscriber = require('../../lib/subscriber')
      , createSpy = sinon.spy(subscriber, "create")
      , responseMessage = '';

    before(function (done) {
      var req = {
        body: { Body: 'Han Solo Spinoff', From: '+1-415-555-5555' }
      };

      responseMessage = requestProcessor.process(req);
      done();
    });

    it('creates a subscription', function(done) {
      expect(
        createSpy.calledWith('+1-415-555-5555', 'han_solo_spinoff')
      ).to.be.true; // jshint ignore:line
      done();
    });

    it('respons with a message', function(done) {
      expect(responseMessage).to.contain('You have been subscribed');
      done();
    });
  });
});
