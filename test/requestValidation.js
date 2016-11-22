const should = require('should');
const CONF = require('../src/server/conf/gateway.json')
let app = require('../src/server/app')
let request = require('supertest')(`http://localhost:${CONF.PORT}`)

let REDIRECT_URI = 'http://localhost:3001';
let INVALID_REDIRECT_URI = 'https://wrong.com';
let AUTHORIZATION_ENDPOINT = '/auth';

describe('Validates Request', () => {
  it('rejects request with invalid paths', (done) => {
    request
      .get('/user')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(401, done)
  })
})