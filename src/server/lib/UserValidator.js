// const BaseValidator = require('cyanide-validator').BaseValidator
const BaseValidator = require('./validator')
const RateLimiter = require('./RateLimiter')

class UserValidator extends BaseValidator {


	get policy_conf() {
		return this.target.policy[this.constructor.name]	
	}

	validate(user_info) {
		this.target = user_info.target
		this.request = user_info.request
		this.user_info = user_info
		this.change_pwd_at = null
		return super.validate(user_info)
	}

	constructor(opt){
		super(opt)
		this.redis = opt.redis
		this.REDIS_TIMEOUT = opt.conf.REDIS_TIMEOUT
		this.rateLimiter = new RateLimiter({
			interval: opt.conf.RATE_LIMIT_INTERVAL
		})
	}

	get uid(){
		return this.user_info.payload.uid
	}

	get app_id(){
		return this.user_info.payload.app_id
	}

	get issued_at(){
		return this.user_info.payload.issued_at
	}

	get expires_at(){
		// console.log(this.user_info.payload)
		return this.user_info.payload.expires_at
	}

	get last_login_ip(){
		return this.user_info.payload.last_login_ip
	}

	get now(){
		return Math.floor(new Date().getTime() / 1000)	
	}

	get_change_pwd_at(policy){
		this.redis.get(this.uid, (err, reply) => {
			if(err)	{
				throw err
			} else {
				this.change_pwd_at = JSON.parse(reply).change_pwd_at
				this.next()
				// this.resolve(JSON.parse(reply).change_pwd_at)
			}		
		})
		setTimeout(()=>{
			// this.reject(Error(policy.throwError()))
			throw policy.throwError()
		}, this.REDIS_TIMEOUT)
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
		this.resolve(this.user_info)
	}

}

module.exports = UserValidator