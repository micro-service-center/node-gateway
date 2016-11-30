const BaseValidator = require('cyanide-validator').BaseValidator
const RateLimiter = require('./RateLimiter')

class UserValidator extends BaseValidator {


	get policy_conf() {
		return this.target.policy[this.constructor.name]	
	}

	validate(user_info) {
		this.target = user_info.target
		this.request = user_info.request
		this.user_info = user_info
		return super.validate(user_info)
	}

	constructor(opt){
		super(opt)
		this.rateLimiter = new RateLimiter({
			interval: opt.conf.RATE_LIMIT_INTERVAL
		})
	}

	enforceRateLimit(args) {
		args.limits.forEach((constrain)=>{
			this.rateLimiter.enforce(
				this.buildLimitKey(constrain.key), 
				{ limit: constrain.limit }
			)
			console.log(constrain)
		})
		// this.rateLimiter.enforce(key, options, cb)
	}

	get ip(){
		return UserValidator.getIP(this.request)
	}

	static getIP(req) {
		return req.headers['x-forwarded-for'] || 
			req.connection.remoteAddress || 
			req.socket.remoteAddress ||
			req.connection.socket.remoteAddress;	
	}

	buildLimitKey(key) {
		return `${key}-${this[key]}`
	}

	done() {
		
	}

}

module.exports = UserValidator