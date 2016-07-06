var expect = require('chai').expect
  , supertest = require('supertest')
  , app = require('../../app.js')
  , cheerio = require('cheerio');

describe('sms', function () {
  describe('POST /sms', function () {
    context ('when message contains "help"', function () {
      it('responds with help message', function (done) {
        var agent = supertest(app);
        agent
          .post('/sms')
          .send({ Body: 'help' })
          .expect(function (res) {
            var $ = cheerio.load(res.text);
            expect($('Response Message').text()).to.contains('To subscribe');
          })
          .expect(200, done);
      });
    });

    context ('when message contains the "movie name"', function () {
      it('responds with subscription message', function (done) {
        var agent = supertest(app);
        agent
          .post('/sms')
          .send({ Body: 'Han Solo Spinoff' })
          .expect(function (res) {
            var $ = cheerio.load(res.text);
            expect($('Response Message').text()).to.equal('You have been subscribed');
          })
          .expect(200, done);
      });
    });

    context ('when message contains "unsub movie name"', function () {
      it('responds with unsubscription message', function (done) {
        var agent = supertest(app);
        agent
          .post('/sms')
          .send({ Body: 'unsub Han Solo Spinoff' })
          .expect(function (res) {
            var $ = cheerio.load(res.text);
            expect($('Response Message').text()).to.equal('You have been unsubscribed');
          })
          .expect(200, done);
      });
    });
  });
});
