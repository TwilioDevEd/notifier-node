'use strict';

var expect = require('chai').expect
  , Q = require('q')
  , sinon = require('sinon')
  , mockery = require('mockery');

describe('subscriber', function () {
  describe('#create', function () {
    var createStub = sinon.stub().returns(Q.resolve({}));
    var twilioMock = function () {
      return {
        notifications: {
          v1: {
            services: function(_) {
              return { bindings: { create: createStub } };
            }
          }
        }
      };
    };

    before(function () {
      mockery.enable({
        useCleanCache: true,
        warnOnReplace: false,
        warnOnUnregistered: false
      });

      mockery.registerMock('twilio', twilioMock);
    });

    after(function () {
      mockery.disable();
    });

    it('creates a subscriber', function(done) {
      var subscriber = require('../../lib/subscriber');

      subscriber.create('+1-415-555-5555', ['han_solo_spinoff']);

      expect(createStub.args[0][0]).to.deep.equal({
        endpoint: '+1-415-555-5555:sms',
        identity: '+1-415-555-5555',
        bindingType: 'sms',
        address: '+1-415-555-5555',
        tag: ['han_solo_spinoff']
      });
      done();
    });
  });
});
