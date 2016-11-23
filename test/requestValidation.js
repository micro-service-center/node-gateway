const should = require('should');
const GATEWAY_CONFIG = require('../src/server/conf/gateway-example.json')
const ERROR_CONFIG = require('../src/server/conf/error.json')
const nock = require('nock')
let App = require('../src/server/main')

let app = new App({
  gateway_conf: GATEWAY_CONFIG, 
  error_conf: ERROR_CONFIG
})
let request = require('supertest')(`http://localhost:${GATEWAY_CONFIG.PORT}`)

describe('Validates Request', () => {

  before(() => {
    app.start()
    // Prepare for the Target Server
    GATEWAY_CONFIG.SERVICES.forEach((service)=>{
      nock(service.nodes[0])
        .get(service.path)
        .reply(200, {
          message: 'succeed'
        });
      })
  })

  // Shut down all the Target Server after the test
  after((done) => {
    app.close()
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