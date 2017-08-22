var request = require('supertest');
var assert = require("assert");

describe('Members Controller', () => {
    it('Should reject empty request', (done) => {
        request(sails.hooks.http.app)
            .post('/members')
            .send()
            .expect(400)
            .end(done);
    });

    it('Should create a member', (done) => {
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
            .expect(200, {
                'memberId': 'test@gmail.com'
            })
            .end(done);

    });

    it('Shoud return member for given member id', (done) => {
        request(sails.hooks.http.app)
            .get('/members/test@gmail.com')
            .expect(200)
            .then(result=>{
                assert.equal(result.email, 'test@gmail.com')
                assert.equal(result.name, 'test');
                assert.equal(result.dob, '1982-01-01');
            });
            done();
        });
});