/** Class for Request Validator */
class RequestValidator {

  /**
   * Create a Request Handler
   * @param {opt} x - Options needed for a request handler
   */
	constructor(opt) {
    this.request = opt.req
		// Define the default result
		this.result = { 
			'rejected': 0,
			'request': null,
			'target_host': 'localhost',
			'target_port': '80'
		}
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
 	judgeRequest() {
		return this.result	
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
  * Check if a request has a specific Key in Header
  * @param { key } req - The particular key in Header.
  * @return { judgement } - Processed result of a request  { rejected: 0, request: req, target_host: &lt;target_host>, target_port: &lt;target_port> }
  */
 	hasHeaderKey(key) {
		return Object.keys(this.request.headers).indexOf(key) > -1
	}

  /**
  * Initializes InMemory DB for Authorization
  * @param { opt } options
  */
 	static initializeRedis(req) {
		return this.result	
	}


}

module.exports = RequestValidator;
