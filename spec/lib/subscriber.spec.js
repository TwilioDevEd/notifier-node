'use strict';

var expect = require('chai').expect
  , subscriber = require('../../lib/subscriber')
  , sinon = require('sinon')
  , mockery = require('mockery')
  , Promise = require('bluebird');

describe('subscriber', function () {
  describe('#create', function () {
    var twilio = require('twilio');

    var twilioStub = function(accountSid, authToken) {
      return new TwilioClientStub();
    };

    var TwilioClientStub = sinon.stub();
    var createStub = sinon.stub().returns(Promise.resolve("response"));

    TwilioClientStub.prototype.notifications = {
      v1: {
        services: function(_) {
          return {
            bindings: { create: createStub }
          };
        }
      }
    };

    before(function (done) {
      mockery.enable();
      mockery.warnOnUnregistered(false);
      mockery.registerMock('twilio', twilioStub);
      done();
    });

    after(function (done) {
      mockery.deregisterMock('twilio');
      mockery.disable();
      done();
    });

    it('creates a subscriber', function(done) {
      subscriber.create('+1-415-555-5555', ['han_solo_spinoff']);

      expect(createStub.calledWith({
        endpoint: '+1-415-555-5555:sms',
        identity: '+1-415-555-5555',
        bindingType: 'sms',
        address: '+1-415-555-5555',
        tag: ['han_solo_spinoff']
      })).to.be.true; // jshint ignore:line

      done();
    });
  });
});
