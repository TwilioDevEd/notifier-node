var expect = require('chai').expect
  , supertest = require('supertest')
  , app = require('../../app.js')
  , sinon = require('sinon')
  , cheerio = require('cheerio');

describe('message', function () {
  describe('POST /message/incoming', function () {
    var requestProcessor = require('../../lib/request-processor');
    var processStub =
      sinon.stub(requestProcessor, "process").returns('message');

    it('calls request processor', function (done) {
      var agent = supertest(app);
      var reqBody = { Body: 'movie', From: '+1-415-555-5555' };

      agent
        .post('/message/incoming')
        .send(reqBody)
        .expect(function () {
          expect(processStub.calledWith(reqBody)).to.be.true; // jshint ignore:line
          expect(processStub.calledOnce).to.be.true; // jshint ignore:line
        })
        .expect(200, done);
    });
  });
});
