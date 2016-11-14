const http = require('http')
const httpProxy = require('http-proxy')
const RequestHandler = require('./lib/RequestHandler')

let proxy = httpProxy.createProxyServer()
let requestHandler = new RequestHandler({'config':'btcchina'})

// Creates the reverse proxy server
http.createServer(function (req, res) {
  if (requestHandler.judgeRequest(req).rejected) {
    res.writeHead(401, { 'Content-Type': 'application/json' });
    res.write('request rejected' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
    res.end();
  	// Process the request
	} else {
  	proxy.web(req, res, { target: 'http://localhost:9008' })
  }
}).listen(8008)

// Create the target Server
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2))
  res.end()
}).listen(9008)
