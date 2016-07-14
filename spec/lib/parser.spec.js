'use strict';

var expect = require('chai').expect
  , parser = require('../../lib/parser');

describe('parser', function () {
  describe('#parse', function () {
    context('when the message contains "help me"', function () {
      it('returns with "help" command', function() {
        var result = parser.parse('help me');
        expect(result).to.have.property('command', 'help');
      });
    });

    context('when the message does not contain "unsub"', function () {
      var result;

      before(function () {
        result = parser.parse('Han Solo Spinoff');
      });

      it('returns with "subscribe" command', function() {
        expect(result).to.have.property('command', 'subscribe');
      });

      it('returns with computed tag', function() {
        expect(result).to.have.property('tag', 'han_solo_spinoff');
      });
    });

    context('when the message contains "unsub"', function () {
      var result;

      before(function () {
        result = parser.parse('unsub Han Solo Spinoff');
      });

      it('returns with "unsub" command', function() {
        expect(result).to.have.property('command', 'unsub');
      });

      it('returns with computed tag', function() {
        expect(result).to.have.property('tag', 'han_solo_spinoff');
      });
    });

    context('when the message contains an invalid movie for subscription', function () {
      it('returns with "invalid" command', function() {
        var result = parser.parse('Phantom Menace');
        expect(result).to.have.property('command', 'invalid');
      });
    });

    context('when the message contains an invalid movie for unsubscription', function () {
      it('returns with "invalid" command', function() {
        var result = parser.parse('unsub Phantom Menace');
        expect(result).to.have.property('command', 'invalid');
      });
    });
  });
});
