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
	approve(request) {
		// Check Request Target
	}
}

module.exports = LoginValidator;