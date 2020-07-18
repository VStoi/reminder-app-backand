process.env.IS_TEST = 'test';

const expect = require('chai').expect;
const request = require('supertest');

const connect = require("../../../src/core/db")
const app = require("../../../src/app")

describe("Create user POST /user", () => {
    before((done) => {
        connect()
            .then(() => done())
            .catch((err) => console.log(err));
    })

    it("Valid creation of user", (done) => {
        request(app).post("/user")
            .send({
                "firstName": "firstName",
                "lastName": "lastName",
                "password": "123456",
                "email": "test@gmail.com"
            })
            .then((res) =>{
                const body = res.body;
                // expect(body).to.contain.property("firstName")
                done();
            })
            .catch((err) => done(err));
    });

    it('OK, getting notes has no notes', (done) => {
        request(app).get('/notes')
            .then((res) => {
                const body = res.body;
                expect(body.length).to.equal(0);
                done();
            })
            .catch((err) => done(err));
    });
})

