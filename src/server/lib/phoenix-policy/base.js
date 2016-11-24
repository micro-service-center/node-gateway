/** Class for User Policy */
class BasePolicy {
	/**
	 * Initializer with options
	 * @param {opt}
	 */
	constructor(opt) {
		this.errorThrower = opt.errorThrower
	}

	approve(requestValidator) {

	}
	/**
	 * Judges whether a request or user object
	 * @param {user}
	 * @return {Boolean}
	 */
	static approve(object) {
		// Throws unimplemented error
		throw new Error('Unimplemented')
	}

	throwError(){

	}


}

module.exports = BasePolicy