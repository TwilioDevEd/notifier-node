'use strict';

var expect = require('chai').expect
  , Q = require('q')
  , sinon = require('sinon')
  , mockery = require('mockery')
  , subscriber = require('../../lib/subscriber');

describe('subscriber', function () {
  var createStub = sinon.stub().returns(Q.resolve({}))
    , listStub = sinon.stub().returns(Q.resolve(
      [
        {
          sid: 'ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
          address: '+1-415-555-5555',
          tags: ['rogue_one', 'han_solo_spinoff']
        }
      ]
    ));

  var twilioMock = function () {
    return {
      notifications: {
        v1: {
          services: function(_) {
            return {
              bindings: { create: createStub, list: listStub }
            };
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
    mockery.deregisterMock('twilio');
    mockery.disable();
  });

  describe('#list', function() {
    it('list notifications', function() {
      return subscriber.list().then(function(bindings) {
        expect(bindings[0]).to.deep.equal(
          {
            id: 'ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
            phone: '+1-415-555-5555',
            tags: ['rogue_one', 'han_solo_spinoff']
          }
        );

        expect(listStub.calledOnce).to.be.true; // jshint ignore:line
      });
    });
  });

  describe('#create', function () {
    it('creates a subscriber', function(done) {

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
