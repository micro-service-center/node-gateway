const http = require('http')
const httpProxy = require('http-proxy')
const RequestValidator = require('./lib/RequestValidator')

// Load Configuration File
const GATEWAY_CONFIG = require('./gateway.json')

let proxy = httpProxy.createProxyServer()
let requestValidator = new RequestValidator({ config: GATEWAY_CONFIG })

// Creates the reverse proxy server
http.createServer((req, res) => {
	// Request Handler Parses Request
	requestValidator.parseRequest(req)
  if (requestValidator.judgeRequest().rejected) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.write('request rejected' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
    res.end();
  	// Process the request
	} else {
  	proxy.web(req, res, { target: 'http://localhost:9008' })
  }
}).listen(8008)