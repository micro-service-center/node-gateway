const RequestValidator = require('phoenix-validator').RequestValidator
const RateLimiter = require('./RateLimiter')

class RobustRequestValidator extends RequestValidator {

	constructor(opt){
		super(opt)
		this.rateLimiter = new RateLimiter()
	}

	enforceRateLimit(key, options, cb) {
		this.rateLimiter.enforce(key, options, cb)
	}

}

module.exports = RobustRequestValidator