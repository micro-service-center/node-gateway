const http = require('http')
const httpProxy = require('http-proxy')

// configurations for gateway
const GATEWAY_CONF = require('./gateway_conf.json')

let server = httpProxy.createServer((req, res, proxy) => {
  var target = {
    host:'myhost.com',
    port:80
  }
  let originalURL = req.url
  var appPath = urlParser.parse(req.url).pathname.substr(1)

  target.host = rows[0].HOST
  target.port = rows[0].PORT?rows[0].port:80
  target.changeOrigin = true
  req.url = req.url.replace(appPath, rows[0].PATH)
  req.headers['host']= target.host
  proxy.proxyRequest(req, res, target)
})

server.on('close', () => {
  console.log('Shutting down the server')
  connection.end()
})

server.listen(8000)
