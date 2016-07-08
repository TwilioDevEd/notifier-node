var expect = require('chai').expect
  , supertest = require('supertest')
  , app = require('../../app.js');

describe('dashboard', function () {
  describe('GET /', function () {
    it('responds with ok', function (done) {
      var agent = supertest(app);
      agent
        .get('/')
        .expect(200, done);
    });
  });
});
