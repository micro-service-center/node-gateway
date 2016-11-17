const RequestValidator = require('./validator/GatewayValidator')

/** Class for Request Handler */
class RequestHandler {

  /**
   * Create a Request Handler
   * @param {opt} x - Options needed for a request handler
   */
	constructor(opt) {
		this.conf = opt.conf
    // Configure the Request Validator
    this.requestValidator = new RequestValidator({
      conf:opt.conf
    })
		// Define the default result
		this.result = { 
			'rejected': 0,
			'request': null,
			'target_host': 'localhost',
			'target_port': '80'
		}
  }

  /**
   * Get configuration key from config dictionary
   * @param {opt} x - Options needed for a request handler
   */
  getConfig(key) {
		return this.config[key]	
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
  * @return { judgement } - Processed result of a request  { rejected: 0, request: req, target_host: &lt;target_host>, target_port: &lt;target_port> }
  */
  handleRequest() {
    if (this.validateRequest().validated) {

    } else {

    }
  }

  /**
  * Validate incoming request
  * @param { request } req - The incoming request object.
  * @return { judgement } - Processed result of a request  { rejected: 0, request: req, target_host: &lt;target_host>, target_port: &lt;target_port> }
  */
 	validateRequest(req) {
    this.parseRequest(req)
    return this.requestValidator
      .validate(this.request)
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