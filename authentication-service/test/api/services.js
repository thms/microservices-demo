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
describe('Services', () => {

  describe('GET /services', () => {
    it('it should get all services', (done) => {
      chai.request(server)
        .get('/services')
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('object');
          res.body.services[0].name.should.be.eq('loan-service')
          done();
        })
    })
  })

/*
  * Happy path for loans
  */
  describe('POST /services', () => {
    it('it should create a service', (done) => {
      chai.request(server)
        .post('/services')
        .send({name: 'service-name', secret: 'service-secret', roles: ['service'], scopes: ['loan:read']})
        .end((err, res) => {
          res.should.have.status(201);
          res.body.should.be.a('object');
          res.body.name.should.be.eq('service-name');
          done();
        })
    });

  });
});
