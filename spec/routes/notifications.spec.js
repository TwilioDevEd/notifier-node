var expect = require('chai').expect
  , supertest = require('supertest')
  , app = require('../../app.js')
  , sinon = require('sinon')
  , mockery = require('mockery');

describe('dashboard', function () {
  describe('GET /notifications/new', function () {
    it('responds with ok', function (done) {
      var agent = supertest(app);
      agent
        .get('/notifications/new')
        .expect(200, done);
    });
  });

  describe('POST /notifications', function () {
    var notification
      , createStub;

    before(function(){
      mockery.enable({
        warnOnReplace: false,
        warnOnUnregistered: false,
        useCleanCache: true
      });

      createStub = sinon.stub();
      var notificationMock = { create: createStub };

      mockery.registerMock('../lib/notification', notificationMock);
      app = require('../../app.js')
    });

    after(function(){
      mockery.disable();
    });

    it('sends notifications', function (done) {
      var agent = supertest(app);
      var params = {
        message: 'Check out the new release',
        movie: 'han_solo_spinoff'
      };

      agent
        .post('/notifications')
        .send(params)
        .expect(function () {
          expect(createStub.calledWith(params.movie, params.message)).to.be.true; // jshint ignore:line
          expect(createStub.calledOnce).to.be.true; // jshint ignore:line
        })
        .expect(200, done);
    });
  });
});
