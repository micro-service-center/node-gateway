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
  * Parse the incoming request
  * @param { req } req - The incoming request object.
  */
 	parseRequest(req) {
    this.request = req
	}

  /**
  * Process incoming request
  * @param { request } req - The incoming request object.
  * @param { respond } res - The incoming request object.
  * @return { judgement } - Processed result of a request  { rejected: 0, request: req, target_host: &lt;target_host>, target_port: &lt;target_port> }
  */
  handleRequest(req, res) {
    this.parseRequest(req)
    try {
      let postValidateReq = this.requestValidator.validate(req)
      req.headers.connection = "Close"
      var p = new Promise((resolve, reject) => {
        this.userValidator.validate(postValidateReq, resolve, reject)
      })
      p.then((response)=>{
        this.proxy.web(req, res, { target: postValidateReq.target.nodes[0] })
      },(rejected_policy)=>{
        console.log('herereere')
      res.writeHead(401, { 'Content-Type': 'application/json' })
      // res.write('request rejected' + req.url + '\n' + json.stringify(req.headers, true, 2));
      res.write(JSON.stringify(
        {"msg": 'aa', "code": 1}
      ))
      res.end()
        // rejected_policy.throwError()
      })
    } catch(e) {
      console.log(e)
      res.writeHead(e.error.http_status, { 'Content-Type': 'application/json' })
      // res.write('request rejected' + req.url + '\n' + json.stringify(req.headers, true, 2));
      res.write(JSON.stringify(
        {"msg": `${e.name} Error`, "code": e.error.code}
      ))
      res.end()
    }
  }

}

module.exports = RequestHandler;