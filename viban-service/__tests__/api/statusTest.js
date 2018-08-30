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
describe('Status', () => {
  /*
  * Test the /GET route
  */
  describe('GET /', () => {
    test('it should GET status / healthcheck', (done) => {
      chai.request(server)
        .get('/')
        .end((err, res) => {
          expect(res.status).toEqual(200);
          expect(typeof res.body).toEqual('object');
          expect(res.body.status).toEqual('ok');
          expect(res.body.service).toEqual('viban-service');
          done();
        });
    });
  });
});
