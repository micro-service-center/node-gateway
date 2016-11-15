/** Class for User Policy */
class BasePolicy {
	/**
	 * Initializer with options
	 * @param {opt}
	 */
	constructor(opt) {
	}

	/**
	 * Judges whether a user object fits
	 * @param {user}
	 */
	static allowed(user) {
		// Throws unimplemented error
		throw new Error('Unimplemented')
	}
}

module.exports = BasePolicy;
