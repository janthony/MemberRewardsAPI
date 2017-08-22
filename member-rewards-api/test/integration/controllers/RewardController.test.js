var request = require('supertest');
var assert = require("assert");
describe('Rewards Controller', () => {

  before(() => {
      const member = {
        email: "test@gmail.com",
        name: "test",
        dob: "1982-01-01",
        city: "melbourne",
        country: "australia",
        street: "ringwood street",
        state: "Victoria"
    }

    request(sails.hooks.http.app)
        .post('/members')
        .send({"member": member})
        .end();

  });

  after(() => {
    request(sails.hooks.http.app)
        .delete('/members/test@gmail.com')
        .end();
  });

  it('reject empty request', (done) => {
    request(sails.hooks.http.app)
      .post('/rewards')
      .send()
      .expect(400)
      .end(done);
  });

  it('should create a reward', (done) => {

    let over30Rule = {
      conditions: {
        all: [{
          fact: 'member',
          operator: 'greaterThanInclusive',
          value: '30',
          path: '.age' // access the 'company' property of "account-information"
        }]
      },
      event: {
        type: 'reward-age-over-30',
        params: {
          message: 'Member over 30 years old'
        }
      }
    };

    request(sails.hooks.http.app)
      .post('/rewards')
      .send({
        reward:{
          rule: over30Rule,
          startDate: '2017-08-20',
          endDate: '2017-08-20',
          rewardDetails: 'Free movie tickets'
        }
      })
      .expect(200)
      .end(done);
  });

  it('should return rewards for member', (done) => {

    request(sails.hooks.http.app)
      .get('/members/test@gmail.com/rewards')
      .expect(200)
      .then(res => {
        assert.equal(res.rewardId, 1);
        assert.equal(res.details, 'Free movie tickets');
      });

    done();
  });

});