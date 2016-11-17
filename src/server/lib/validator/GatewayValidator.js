const RequestValidator = require('./Base') 
/** Class for Gateway Validator */ 
class GatewayValidator extends RequestValidator {

	/**
	 * Judges what is included in the request object
	 * @param  {request}
	 * @return {
	 *	result: {Boolean} 
	 *	service: {service name}
	 * }
	 */
	validate(request) {
      return this.parseRequest(request)
      .checkPath()
      .checkAuthRequirement()
      .done()
		// Check Request Target
	}
}

module.exports = GatewayValidator;