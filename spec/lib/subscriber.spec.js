'use strict';

var expect = require('chai').expect
  , Q = require('q')
  , sinon = require('sinon')
  , mockery = require('mockery')
  , subscriber = require('../../lib/subscriber');

describe('subscriber', function () {
  context('bindings is an object', function() {
    var createStub = sinon.stub().returns(Q.resolve({}))
      , deleteStub = sinon.stub().returns(Q.resolve({}))
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
                bindings: { create: createStub, list: listStub, delete: deleteStub }
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

    describe('#find', function() {
      context('when the criteria matches with some subscriber', function () {
        it('returns a subscriber', function() {
          return subscriber.find('+1-415-555-5555').then(function(res) {
            expect(res).to.deep.equal(
              {
                id: 'ISXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
                phoneNumber: '+1-415-555-5555',
                movies: ['rogue_one', 'han_solo_spinoff']
              }
            );

            expect(listStub.calledOnce).to.be.true; // jshint ignore:line
          });
        });
      });

      context('when the criteria does not match with any subscriber', function () {
        it('returns undefined', function() {
          return subscriber.find('nonexistent-phone').then(function(res) {
            expect(res).to.undefinded; // jshint ignore:line
            expect(listStub.called).to.be.true; // jshint ignore:line
          });
        });
      });
    });

    describe('#create', function () {
      it('creates a subscriber', function() {
        subscriber.create('+1-415-555-5555', ['han_solo_spinoff']);

        expect(createStub.args[0][0]).to.deep.equal({
          endpoint: '+1-415-555-5555:sms',
          identity: '+1-415-555-5555',
          bindingType: 'sms',
          address: '+1-415-555-5555',
          tag: ['han_solo_spinoff']
        });
      });
    });
  });

  context('bindings is a function', function() {
    var deleteStub = sinon.stub().returns(Q.resolve({}));
    var bindingsStub = sinon.stub().returns({ remove: deleteStub });

    var twilioMock = function () {
      return {
        notifications: {
          v1: {
            services: function(_) {
              return { bindings: bindingsStub };
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

    describe('#delete', function () {
      it('deletes a subscriber', function() {
        subscriber.delete('BSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');

        expect(
          bindingsStub.calledWith('BSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
        ).to.be.true; // jshint ignore:line

        expect(deleteStub.called).to.be.true; // jshint ignore:line
      });
    });
  });
});
