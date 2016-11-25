/** Class for User Policy */
class BasePolicy {
	/**
	 * Initializer with options
	 * @param {opt}
	 */
	constructor(opt) {
		this.errorThrower = opt.errorThrower
	}

	approve(validator) {
		if (!this._approve(validator)) {
			this.throwError()
		}
	}

	/**
	 * Judges whether a request or user object
	 * @param {user}
	 * @return {Boolean}
	 */
	_approve(validator) {
		// Throws unimplemented error
		throw new Error('Unimplemented')
	}

	throwError(){
		this.errorThrower.throw()
	}


}

module.exports = BasePolicy