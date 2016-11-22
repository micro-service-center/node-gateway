const http = require('http')
const httpProxy = require('http-proxy')
const RequestHandler = require('./lib/RequestHandler')

// Load Configuration File
const GATEWAY_CONFIG = require('./conf/gateway.json')
const ERROR_CONFIG = require('./conf/error.json')

// Stackoverflow 21409199
let proxy = httpProxy.createProxyServer({agent: new http.Agent()})

let requestHandler = new RequestHandler({ 
  conf: GATEWAY_CONFIG,
  errorConf: ERROR_CONFIG
})

// Creates the reverse proxy server
http.createServer((req, res) => {
	// Request Handler Validates
  try {
    postValidateReq = requestHandler.validateRequest(req)
    proxy.web(req, res, { target: postValidateReq.target.nodes[0] })
  } catch(e) {
    res.writeHead(e.error.http_status, { 'Content-Type': 'application/json' });
    // res.write('request rejected' + req.url + '\n' + json.stringify(req.headers, true, 2));
    res.write(JSON.stringify(
      {"msg": `${e.name} Error`, "code": e.error.code}
    ));
    res.end();
  }

}).listen(8006)