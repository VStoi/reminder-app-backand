const expect = require("chai").expect;
const request = require("supertest");

const app = require("../../../src/app");

const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");
let mongoServer;

describe("Create user Positive POST /user", () => {
    beforeEach((done) => {
        mongoServer = new MongoMemoryServer();
        mongoServer.getUri()
            .then((mongoUri) => {
                mongoose.connect(mongoUri, {useUnifiedTopology: true, useNewUrlParser: true});
                done();
            });
    });
    afterEach(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it("Valid creation of user", (done) => {
        request(app).post("/user")
            .send({
                "firstName": "Test name",
                "lastName": "Test Last Name",
                "password": "123456",
                "email": "test@gmail.com"
            })
            .then((res) => {
                const user = res.body.user;
                expect(user.firstName).to.equals("Test name");
                expect(user.lastName).to.equals("Test Last Name");
                expect(user).to.contain.property("password");
                expect(user.email).to.equals("test@gmail.com");
                expect(user).to.contain.property("_id");
                done();
            })
            .catch((err) => done(err));
    });

    it("Valid creation of user min values", (done) => {
        request(app).post("/user")
            .send({
                "firstName": "Te",
                "lastName": "La",
                "password": "123456",
                "email": "qq@qa.ua"
            })
            .then((res) => {
                const user = res.body.user;
                expect(user.firstName).to.equals("Te");
                expect(user.lastName).to.equals("La");
                expect(user).to.contain.property("password");
                expect(user.email).to.equals("qq@qa.ua");
                expect(user).to.contain.property("_id");
                done();
            })
            .catch((err) => done(err));
    });

    it("Valid creation of user max values", (done) => {
        request(app).post("/user")
            .send({
                "firstName": "max symbols first na",
                "lastName": "max symbols last nam",
                "password": "12345678901234567890123456789012345678901234567890",
                "email": "qqqqqqqqqqqqqqqqqqqqqqqq@qaqqqqqqqqqqqqqqqqqqqqqqqqqqqq.ua"
            })
            .then((res) => {
                const user = res.body.user;
                expect(user.firstName).to.equals("max symbols first na");
                expect(user.lastName).to.equals("max symbols last nam");
                expect(user).to.contain.property("password");
                expect(user.email).to.equals("qqqqqqqqqqqqqqqqqqqqqqqq@qaqqqqqqqqqqqqqqqqqqqqqqqqqqqq.ua");
                expect(user).to.contain.property("_id");
                done();
            })
            .catch((err) => done(err));
    });
});


describe("Create user Negative POST /user", () => {
    before((done) => {
        mongoServer = new MongoMemoryServer();
        mongoServer.getUri()
            .then((mongoUri) => {
                mongoose.connect(mongoUri, { useUnifiedTopology: true,  useNewUrlParser: true });
                done();
            });
    });
    after(async () => {
        await mongoose.disconnect();
        await mongoServer.stop();
    });

    it("errors due to required first name", (done) => {
        request(app).post("/user")
            .send({
                "firstName": "",
                "lastName": "Test Last Name",
                "password": "123456",
                "email": "test@gmail.com"
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equals(400);
                expect(body.error).to.equals("\"firstName\" is not allowed to be empty");
                done();
            })
            .catch((err) => done(err));
    });

    it("errors due to short first name", (done) => {
        request(app).post("/user")
            .send({
                "firstName": "q",
                "lastName": "Test Last Name",
                "password": "123456",
                "email": "test@gmail.com"
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equals(400);
                expect(body.error).to.equals("\"firstName\" length must be at least 2 characters long");
                done();
            })
            .catch((err) => done(err));
    });

    it("errors due to long first name", (done) => {
        request(app).post("/user")
            .send({
                "firstName": "max symbols first nam",
                "lastName": "Test Last Name",
                "password": "123456",
                "email": "test@gmail.com"
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equals(400);
                expect(body.error).to.equals("\"firstName\" length must be less than or equal to 20 characters long");
                done();
            })
            .catch((err) => done(err));
    });

    it("errors due to required last name", (done) => {
        request(app).post("/user")
            .send({
                "firstName": "fname",
                "lastName": "",
                "password": "123456",
                "email": "test@gmail.com"
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equals(400);
                expect(body.error).to.equals("\"lastName\" is not allowed to be empty");
                done();
            })
            .catch((err) => done(err));
    });

    it("errors due to short last name", (done) => {
        request(app).post("/user")
            .send({
                "firstName": "fname",
                "lastName": "q",
                "password": "123456",
                "email": "test@gmail.com"
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equals(400);
                expect(body.error).to.equals("\"lastName\" length must be at least 2 characters long");
                done();
            })
            .catch((err) => done(err));
    });

    it("errors due to long last name", (done) => {
        request(app).post("/user")
            .send({
                "firstName": "fname",
                "lastName": "max symbols last name",
                "password": "123456",
                "email": "test@gmail.com"
            })
            .then((res) => {
                const body = res.body;
                expect(res.status).to.equals(400);
                expect(body.error).to.equals("\"lastName\" length must be less than or equal to 20 characters long");
                done();
            })
            .catch((err) => done(err));
    });

});

