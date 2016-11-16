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
	 * @param {user}
	 * @return {Boolean}
	 */
	static allowed(object) {
		// Throws unimplemented error
		throw new Error('Unimplemented')
	}

	/**
	 * Judges what is included in the request object
	 * @param  {request}
	 * @return {Boolean}
	 */
	static has(object) {
		throw new Error('Unimplemented')
	}
}

module.exports = BasePolicy;