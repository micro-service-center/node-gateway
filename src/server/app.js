const http = require('http')
const httpProxy = require('http-proxy')

// configurations for gateway
const GATEWAY_CONF = require('./gateway_conf.json')

/**
* Process incoming request
* @param { request } req - The incoming request object.
* @return { judgement } - Processed result of a request  { rejected: 0, request: req, target_host: <target_host>, target_port: <target_port> }
*/
function judgeRequest(req) {
  return {
    'rejected': 0,
    'request' : req,
    'target_host' : 'localhost',
    'target_port' : 9000
  }
}

let server = httpProxy.createServer((req, res, proxy) => {

  let judgement = judgeRequest(req)
  if (judgement.rejected) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.write('request successfully proxied to: ' + req.url + '\n' + JSON.stringify(req.headers, true, 2));
    res.end();
  }else{
    proxy.web(req, res, { target :'http://localhost:9000'})
  }
})

server.on('close', () => {
  console.log('Shutting down the server')
  connection.end()
})

server.listen(8000)

// Target Server
http.createServer(function (req, res) {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.write('request successfully proxied!' + '\n' + JSON.stringify(req.headers, true, 2));
  res.end();
}).listen(9000);
