const BasePolicy = require('base')

/** Class for User Policy */
class HeaderPolicy extends BasePolicy {

	/**
	 * Judges whether a request or user object
	 * @param {user}
	 * @return {Boolean}
	 */
	static approve(requestValidator) {
		if (!requestValidator.paths.indexOf(requestValidator.pathRoot)) {
			this.errorThrower.throw('pathError')
		}
	}

}

module.exports = BasePolicy