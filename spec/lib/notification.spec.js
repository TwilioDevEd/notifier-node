'use strict';

var expect = require('chai').expect
  , Q = require('q')
  , notification = require('../../lib/notification')
  , sinon = require('sinon')
  , mockery = require('mockery');

describe('notification', function () {
  var createStub = sinon.stub().returns(Q.resolve({}));
  var twilioMock = function () {
    return {
      notify: {
        v1: {
          services: function(_) {
            return {
              notifications: { create: createStub },
            };
          }
        }
      }
    };
  };

  before(function () {
    mockery.enable();
    mockery.warnOnUnregistered(false);
    mockery.registerMock('twilio', twilioMock);
  });

  after(function () {
    mockery.deregisterMock('twilio');
    mockery.disable();
  });

  describe('#create', function () {
    it('creates a notification', function() {
      notification.create(['han_solo_spinoff'], 'Han Solo Spinoff new release');

      expect(createStub.calledWith({
        tag: ['han_solo_spinoff'],
        body: 'Han Solo Spinoff new release',
        sms: JSON.stringify({
          from: 'my-twilio-number'
        })
      })).to.be.true; // jshint ignore:line
    });
  });
});
