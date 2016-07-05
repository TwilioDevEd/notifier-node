'use strict';

var expect = require('chai').expect
  , notification = require('../../lib/notification')
  , sinon = require('sinon')
  , mockery = require('mockery')
  , Promise = require('bluebird');

describe('notification', function () {
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
            notifications: { create: createStub }
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

    it('creates a notification', function(done) {
      notification.create(['han_solo_spinoff'], 'Han Solo Spinoff new release');

      expect(createStub.calledWith({
        tag: ['han_solo_spinoff'],
        body: 'Han Solo Spinoff new release',
        sms: JSON.stringify({
          from: 'my-twilio-number'
        })
      })).to.be.true; // jshint ignore:line

      done();
    });
  });
});
