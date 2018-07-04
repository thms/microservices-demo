// During the test the env variable is set to test
process.env.NODE_ENV = 'test';
process.env.PORT = '3000';

// Require the dev-dependencies
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../app');

const should = chai.should();

chai.use(chaiHttp);
// Our parent block
describe('Users', () => {
  /*
  * Test the /GET route
  */
  describe('GET /users/', () => {
    it('it should GET users by id if exists', (done) => {
      chai.request(server)
        .get('/users/1')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.email.should.be.eq('mike@example.com');
          res.body.name.should.be.eq('mike');
          done();
        });
    });

    it('it should GET all users', (done) => {
      chai.request(server)
        .get('/users')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.users.should.be.a('array');
          res.body.users.length.should.be.eq(2);
          done();
        });
    });

    it('it should GET  user by email', (done) => {
      chai.request(server)
        .get('/users?email=mike@example.com')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.users.should.be.a('array');
          res.body.users.length.should.be.eq(1);
          res.body.users[0].email.should.be.eq('mike@example.com')
          done();
        });
    });

    // it('it should respond wiht 404 if the user cannot be found', (done) => {
    //   chai.request(server)
    //     .get('/users?email=non.existing@example.com')
    //     .end((err, res) => {
    //       res.should.have.status(404);
    //       done();
    //     });
    // });

  }); // describe
});
