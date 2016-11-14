/** Class for Request Handler */
class RequestHandler {
  /**
   * Create a Request Handler
   * @param {opt} x - Options needed for a request handler
   */
	constructor(opt) {
		// Define the default result
		this.result = { 
			'rejected': 0,
			'request': null,
			'target_host': 'localhost',
			'target_port': '80'
		}
  }

  /**
  * Process incoming request
  * @param { request } req - The incoming request object.
  * @return { judgement } - Processed result of a request  { rejected: 0, request: req, target_host: &lt;target_host>, target_port: &lt;target_port> }
  */
 	judgeRequest(req) {
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
  * Initializes InMemory DB for Authorization
  * @param { opt } options
  */
 	static initializeRedis(req) {
		return this.result	
	}

}

module.exports = RequestHandler;
