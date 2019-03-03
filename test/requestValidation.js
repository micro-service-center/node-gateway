const GATEWAY_CONFIG = require(`../src/config/gateway`)
const ERROR_CONFIG = require(`../vaultech-policy-store/error.json`)
const jwt = require('jwt-simple')

const should = require('should')
const nock = require('nock')
let App = require('../src/server/server')

let app = new App({
  gateway_conf: GATEWAY_CONFIG,
  error_conf: ERROR_CONFIG
})
let request = require('supertest')(`http://localhost:${GATEWAY_CONFIG.PORT}`)

describe('Validates Request', () => {
  before(() => {
    app.start()
        // Prepare for the Target Server
    GATEWAY_CONFIG.SERVICES.forEach((service) => {
      nock(service.nodes[0])
                .defaultReplyHeaders({
                  'X-Powered-By': 'Rails',
                  'Content-Type': 'application/json'
                })
                .get(service.path)
                .reply(200, {
                  message: 'succeed'
                })
                .get('/api')
                .reply(200, {
                  message: 'succeed'
                })
    })
  })

    // Shut down all the Target Server after the test
  after((done) => {
    app.close()
    nock.cleanAll()
    done()
  })

  it('should reject request with invalid paths', (done) => {
    request
            .get('/user')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(401, done)
  })

  it('should allow request with valid paths', (done) => {
    request
            .get('/api')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done)
  })

  it('should reject request with invalid auth HeaderKey', (done) => {
    request
            .get('/captcha')
            .set('Accept', 'application/json')
            .set('AuthKey', 'aaa')
            .expect('Content-Type', /json/)
            .expect(401, done)
  })

  it('should allow request with valid auth HeaderKey', (done) => {
    request
            .get('/api')
            .set('Accept', 'application/json')
            .set('api-credential', 'aaa')
            .expect('Content-Type', /json/)
            .expect(200, done)
  })

  it('should reject requests with incorrect jwt', (done) => {
    request
            .get('/jwt_wrong_header')
            .set('Accept', 'application/json')
            .set('x-credential', 'WRONGJWTTOKEN')
            .expect('Content-Type', /json/)
            .expect(401, done)
  })
})
