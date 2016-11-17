const http = require('http')
const httpProxy = require('http-proxy')
const RequestHandler = require('./lib/RequestHandler')

// Load Configuration File
const GATEWAY_CONFIG = require('./gateway.json')

let proxy = httpProxy.createProxyServer()
let requestHandler = new RequestHandler({ conf: GATEWAY_CONFIG })

// Creates the reverse proxy server
http.createServer((req, res) => {
	// Request Handler Parses Request
	requestHandler.parseRequest(req)
  if (requestHandler.validateRequest().validated) {
    proxy.web(req, res, { target: 'http://localhost:9008' })
  	// Process the request
	} else {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.write('request rejected' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
    res.end();
  }
}).listen(8008)