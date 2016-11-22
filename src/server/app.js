const http = require('http')
const RequestHandler = require('./lib/RequestHandler')
const RequestValidator = require('./lib/validator/GatewayValidator')
// Load Configuration File
const GATEWAY_CONFIG = require('./conf/gateway.json')
const ERROR_CONFIG = require('./conf/error.json')

// Request Validator
let requestValidator = new RequestValidator({
  conf: GATEWAY_CONFIG,
  errorConf: ERROR_CONFIG.validator.request
})

// Request Handler
let requestHandler = new RequestHandler({ 
  conf: GATEWAY_CONFIG,
  requestValidator: requestValidator
})

// Creates the reverse proxy server
http.createServer((req, res) => {
	// Request Handler Validates
  requestHandler.handleRequest(req, res)
}).listen(8006)