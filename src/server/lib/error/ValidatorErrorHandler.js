const BaseErrorHandler = require('./Base') 

/** Class for Gateway Validator */ 
class ValidatorErrorHandler extends BaseErrorHandler {
	log(msg){
		console.log(msg)
	}
}

module.exports = ValidatorErrorHandler