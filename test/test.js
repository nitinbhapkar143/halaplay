
const user = require('../src/models/user');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../src/bin/www');
const should = chai.should();

chai.use(chaiHttp);

describe('user', () => {  
    before((done) => {
        user.deleteMany({},(err, response) => {
            done()
        })
    })

    describe('/Create', () => {
        it('it should not create user without body', (done) => {
            chai.request(server)
            .post(`/api/user`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.status.should.be.eql(false);
                res.body.message.should.be.eql("Email field is empty.");
                done();
            });
        });
        it('it should not create user with empty body', (done) => {
            chai.request(server)
            .post(`/api/user`)
            .send({})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.status.should.be.eql(false);
                res.body.message.should.be.eql("Email field is empty.");
                done();
            });
        });
        it('it should not create user without email', (done) => {
            chai.request(server)
            .post(`/api/user`)
            .send({
                password : "nbtest"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.status.should.be.eql(false);
                res.body.message.should.be.eql("Email field is empty.");
                done();
            });
        });
        it('it should not create user without password', (done) => {
            chai.request(server)
            .post(`/api/user`)
            .send({
                email : "nitin.gmail.com"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.status.should.be.eql(false);
                res.body.message.should.be.eql("Password field is empty.");
                done();
            });
        });
        it('it should not create user with password less than 4 characters', (done) => {
            chai.request(server)
            .post(`/api/user`)
            .send({
                email : "nitin@gmail.com",
                password : "nbt"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.status.should.be.eql(false);
                res.body.message.should.be.eql("Password should be at least 4 characters.");
                done();
            });
        });
        it('it should not create user with password more than 20 characters', (done) => {
            chai.request(server)
            .post(`/api/user`)
            .send({
                email : "nitin@gmail.com",
                password : "nbtdgvgevvwu62712t721tdgvuyeg328y37267"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.status.should.be.eql(false);
                res.body.message.should.be.eql("Password should be at max 20 characters.");
                done();
            });
        });
        it('it should not create user with invalid email', (done) => {
            chai.request(server)
            .post(`/api/user`)
            .send({
                email : "nitin.gmail.com",
                password : "nbtest"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.status.should.be.eql(false);
                res.body.message.should.be.eql("Please enter a valid email address.");
                done();
            });
        });
        it('it should create user with valid email and password', (done) => {
            chai.request(server)
            .post(`/api/user`)
            .send({
                email : "nitin@gmail.com",
                password : "nbtest"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.eql(true);
                res.body.message.should.be.eql("User created.");
                done();
            });
        });
        it('it should create user with valid email and password', (done) => {
            chai.request(server)
            .post(`/api/user`)
            .send({
                email : "nitin1@gmail.com",
                password : "nbtest2"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.eql(true);
                res.body.message.should.be.eql("User created.");
                done();
            });
        });
        it('it should create user with valid email and password', (done) => {
            chai.request(server)
            .post(`/api/user`)
            .send({
                email : "nitin2@gmail.com",
                password : "nbtest2"
            })
            .end((err, res) => {
                res.should.have.status(200);
                res.body.status.should.be.eql(true);
                res.body.message.should.be.eql("User created.");
                done();
            });
        });
        it('it should not create user with duplicate email', (done) => {
            chai.request(server)
            .post(`/api/user`)
            .send({
                email : "nitin@gmail.com",
                password : "nbtest"
            })
            .end((err, res) => {
                res.should.have.status(409);
                res.body.status.should.be.eql(false);
                res.body.message.should.be.eql("An account with the email already exists.");
                done();
            });
        });
    });
    describe('/Login', () => {
        it('it should not login user without body', (done) => {
            chai.request(server)
            .post(`/api/login`)
            .end((err, res) => {
                res.should.have.status(400);
                res.body.status.should.be.eql(false);
                res.body.message.should.be.eql("Email field is empty.");
                done();
            });
        });
        it('it should not login user with empty body', (done) => {
            chai.request(server)
            .post(`/api/login`)
            .send({})
            .end((err, res) => {
                res.should.have.status(400);
                res.body.status.should.be.eql(false);
                res.body.message.should.be.eql("Email field is empty.");
                done();
            });
        });
        it('it should not login user without email', (done) => {
            chai.request(server)
            .post(`/api/login`)
            .send({
                password : "nbtest"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.status.should.be.eql(false);
                res.body.message.should.be.eql("Email field is empty.");
                done();
            });
        });
        it('it should not login user without password', (done) => {
            chai.request(server)
            .post(`/api/login`)
            .send({
                email : "nitin.gmail.com"
            })
            .end((err, res) => {
                res.should.have.status(400);
                res.body.status.should.be.eql(false);
                res.body.message.should.be.eql("Password field is empty.");
                done();
            });
        });
        it('it should not login user with invalid email', (done) => {
            chai.request(server)
            .post(`/api/login`)
            .send({
                email : "nbinvalid@gmail.com",
                password : "nbtest"
            })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.status.should.be.eql(false);
                res.body.message.should.be.eql("Invalid email or password.");
                done();
            });
        });
        it('it should not login user with invalid password', (done) => {
            chai.request(server)
            .post(`/api/login`)
            .send({
                email : "nitin@gmail.com",
                password : "nbte"
            })
            .end((err, res) => {
                res.should.have.status(401);
                res.body.status.should.be.eql(false);
                res.body.message.should.be.eql("Invalid email or password.");
                done();
            });
        });
        it('1st valid login request', (done) => {
            chai.request(server)
            .post(`/api/login`)
            .send({
                email : "nitin@gmail.com",
                password : "nbtest"
            })
            .end((err, res) => {
                done();
            });
        });
        it('2nd valid login request', (done) => {
            chai.request(server)
            .post(`/api/login`)
            .send({
                email : "nitin@gmail.com",
                password : "nbtest"
            })
            .end((err, res) => {
                done();
            });
        });
        it('3rd valid login request', (done) => {
            chai.request(server)
            .post(`/api/login`)
            .send({
                email : "nitin@gmail.com",
                password : "nbtest"
            })
            .end((err, res) => {
                done();
            });
        });
        it('4th valid login request', (done) => {
            chai.request(server)
            .post(`/api/login`)
            .send({
                email : "nitin@gmail.com",
                password : "nbtest"
            })
            .end((err, res) => {
                done();
            });
        });
        it('it should not login user as its 5th valid request', (done) => {
            chai.request(server)
            .post(`/api/login`)
            .send({
                email : "nitin@gmail.com",
                password : "nbtest"
            })
            .end((err, res) => {
                res.should.have.status(429);
                res.body.status.should.be.eql(false);
                res.body.message.should.be.eql("Too many requests.");
                done();
            });
        });
    });
});

