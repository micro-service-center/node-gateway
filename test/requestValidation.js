const should = require('should');
const CONF = require('../src/server/conf/gateway-example.json')
const nock = require('nock')
let app = require('../src/server/app')
let request = require('supertest')(`http://localhost:${CONF.PORT}`)

describe('Validates Request', () => {

  before(() => {
    // Prepare for the Target Server
    CONF.SERVICES.forEach((service)=>{
      nock(service.nodes[0])
        .get(service.path)
        .reply(200, {
          message: 'succeed'
        });
      })
  })

  // Shut down all the Target Server after the test
  after((done) => {
    nock.cleanAll();
    done()
  });

  it('should reject request with invalid paths', (done) => {
    request
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done)
  })

  it('should allow request with valid paths', (done) => {
    request
      .get('/auth')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })

})