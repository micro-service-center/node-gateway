const http = require('http')
const httpProxy = require('http-proxy')

/** Class for Request Handler */
class RequestHandler {

  /**
   * Create a Request Handler
   * @param {opt} x - Options needed for a request handler
   */
	constructor(opt) {
    this.requestValidator = opt.requestValidator
    this.userValidator = opt.userValidator
    // Stackoverflow #21409199
    this.proxy = httpProxy.createProxyServer({
      agent: new http.Agent(),
      changeOrigin: true,
      target: {
        https: true
      }
    })
  }

  /**
  * Process incoming request
  * @param { request } req - The incoming request object.
  * @param { respond } res - The incoming request object.
  * @return { judgement } - Processed result of a request  { rejected: 0, request: req, target_host: &lt;target_host>, target_port: &lt;target_port> }
  */
  handleRequest(req, res) {
    this.req = req
    this.res = res
    this.req.headers.connection = "Close"

    this.requestValidator
    .validate(req)
    .then((result)=>{this.userValidator.validate(result)
    .then((result)=>{this.resolveRequest(result)})}).catch((err)=>{
     this.rejectRequest(err) 
    }).catch((err)=>{
     this.rejectRequest(err) 
    })

  }

  resolveRequest(result) {
    this.proxy.web(this.req, this.res, { target: result.target.nodes[0] })
  }

  rejectRequest(err) {
    console.log(err)
    this.res.writeHead(err.error.http_status, { 'Content-Type': 'application/json' })
    // res.write('request rejected' + req.url + '\n' + json.stringify(req.headers, true, 2));
    this.res.write(JSON.stringify(
      {"msg": `${err.name} Error`, "code": err.error.code}
    ))
    this.res.end()
  }

}

module.exports = RequestHandler;