const http = require('http')
const httpProxy = require('http-proxy')
const RequestHandler = require('./lib/RequestHandler')

// Load Configuration File
const GATEWAY_CONFIG = require('./conf/gateway.json')

let proxy = httpProxy.createProxyServer()
let requestHandler = new RequestHandler({ conf: GATEWAY_CONFIG })

// Creates the reverse proxy server
http.createServer((req, res) => {
	// Request Handler Validates
  postValidateReq = requestHandler.validateRequest(req)
  if (postValidateReq.validated) {
    proxy.web(req, res, { target: postValidateReq.target })
  	// Process the request
	} else {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.write('request rejected' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
    res.end();
  }
}).listen(8008)