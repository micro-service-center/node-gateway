const http = require('http')
const httpProxy = require('http-proxy')

//
// Create a proxy server with latency
//
let proxy = httpProxy.createProxyServer()

//
// Create your server that makes an operation that waits a while
// and then proxies the request
//
http.createServer(function (req, res) {
  // This simulates an operation that takes 500ms to execute
  proxy.web(req, res, {
    target: 'http://localhost:9008'
  })
}).listen(8008)

//
// Create your target server
//
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2))
  res.end()
}).listen(9008)
