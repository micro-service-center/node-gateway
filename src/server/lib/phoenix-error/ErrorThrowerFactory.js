const ErrorThrower = require('./ErrorThrower')

class ErrorThrowerFactory {
	/**
	 * Create Error Thrower Factory
	 * @param  {Object} opt Parameters
	 */
	constructor(opt) {
		this.conf = opt.conf	
	}

	/**
	 * Build Error Throwers
	 * @param  {[type]} policy_name [description]
	 * @return {[type]}             [description]
	 */
	build(policy_name) {
		return new ErrorThrower({
			err: this.conf.errors[`${policy_name}_error`]
		})
	}
}


module.exports = ErrorThrowerFactory