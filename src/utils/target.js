const http = require('http')

// Create the target Server
http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })
  res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2))
  res.end()
}).listen(9008)
