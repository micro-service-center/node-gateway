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
      agent: new http.Agent()
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
      let postValidateUser = this.userValidator.validate(postValidateReq)
      req.headers.connection = "Close";
      this.proxy.web(req, res, { target: postValidateReq.target.nodes[0] })
    } catch(e) {
      console.log(e)
      res.writeHead(e.error.http_status, { 'Content-Type': 'application/json' });
      // res.write('request rejected' + req.url + '\n' + json.stringify(req.headers, true, 2));
      res.write(JSON.stringify(
        {"msg": `${e.name} Error`, "code": e.error.code}
      ));
      res.end();      
    }
  }

  /**
  * Translate API AccessKey & Token to JWT
  * @param { request } req - The incoming request object.
  * @return { _request } - Processed Request, Header translated to JWT
  */
 	toJWT(req) {
		return this.result	
	}

  /**
  * Initializes InMemory DB for Authorization
  * @param { opt } options
  */
 	static initializeRedis(req) {
		return this.result	
	}

}

module.exports = RequestHandler;