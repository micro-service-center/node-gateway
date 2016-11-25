const BasePolicy = require('./base')

/** Class for User Policy */
class HeaderPolicy extends BasePolicy {

	/**
	 * Judges whether a request or user object
	 * @param {user}
	 * @return {Boolean}
	 */
	static _approve(requestValidator) {
		return true
	}

}

module.exports = HeaderPolicy