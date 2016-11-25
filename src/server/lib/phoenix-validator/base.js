const PolicyFactory = require('../phoenix-policy/PolicyFactory')
/** Class for Request Validator */
class BaseValidator {

	/**
	 * Initialize the validator
	 * @param  {Object}
	 * @param  {Array} policy_conf, Policies
	 */
	constructor(opt) {
		this.conf = opt.conf
		this.policy_conf = opt.policy_conf
	}


	/**
	 * @attribute policies
	 */
	get policies() {
		var policy_list = []
		this.policy_conf.forEach((policy)=>{
			policy_list.push(PolicyFactory._build(policy))
		})
		return policy_list
	}

	before() {
		return this
	}

	after() {
		return this
	}

	/**
	 * Run checks all policies
	 * @return {[type]} [description]
	 */
	run() {
		this.policies.forEach((policy, index) => {
			policy.approve(this)
		})
		return this
	}

	validate(obj) {
		return this
			.before()
			.run()
			.after()
			.done()
	}

	/**
	 * check if request needs authentication
	 * @param  {request}
	 * @return {this}
	 */
	done()	{
		throw new Error('Unimplemented')
	}

}

module.exports = BaseValidator;