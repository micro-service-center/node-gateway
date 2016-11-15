/** Class for User Policy */
class BasePolicy {
	/**
	 * Initializer with options
	 * @param {opt}
	 */
	constructor(opt) {
	}

	/**
	 * Judges whether a request or user object
	 * @param {object}
	 */
	static allowed(object) {
		// Throws unimplemented error
		throw new Error('Unimplemented')
	}
}

module.exports = BasePolicy;