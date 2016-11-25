const ErrorThrowerFactory = require('../phoenix-error/ErrorThrowerFactory')
const ERROR_CONF = require('../../conf/error.json')

errorThrowerFactory = new ErrorThrowerFactory({conf: ERROR_CONF})

/** Builds Policies */
class PolicyFactory {
	static _build(policy_name) {
		let Policy = require(`./${policy_name}`)
		return new Policy({
			errorThrower: errorThrowerFactory.build(policy_name)	
		})
	}
}

module.exports = PolicyFactory