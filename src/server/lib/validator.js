// const PolicyFactory = require('cyanide-policy').PolicyFactory

/** Class for Request Validator */
class BaseValidator {

	/**
	 * Initialize the validator
	 * @param  {Object}
	 * @param  {Array} policy_conf, Policies
	 */
	constructor(opt) {
		this.policyFactory = opt.policyFactory
		this.policy_list = []
	}

	/**
	 * @attribute policy_conf
	 */
	get policy_conf() {
		throw new Error('Unimplemented')
	}

	/**
	 * @attribute policies
	 */
	get policies() {
		var policy_list = []
		this.policy_conf.forEach((policy)=>{
			policy_list.push(this.policyFactory.build(policy))
		})
		return policy_list
	}

	before() {
		return this
	}

	after() {
		return this.done()
	}

	/**
	 * Run checks all policies
	 * @return {[type]} [description]
	 */
	run() {
		this.policy_list = this.policies
		return this.next()
	}

	next() {
		if (this.policy_list.length) {
			return this.policy_list.shift().approve(this)
		} else {
			return this.after()
		}
	}

	validate(obj) {
		return this.before().run()
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