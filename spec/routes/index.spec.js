var expect = require('chai').expect
  , supertest = require('supertest')
  , app = require('../../app.js');

describe('dashboard', function () {
  describe('GET /', function () {
    it('responds with redirect', function (done) {
      var agent = supertest(app);
      agent
        .get('/')
        .expect(302)
        .expect('Location', '/notifications/new')
        .end(done);
    });
  });
});
