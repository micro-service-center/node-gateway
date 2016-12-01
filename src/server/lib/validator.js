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
		this.policy_index = 0
		console.log('end !!!!!!!!!!!!!!')
		return this
	}

	/**
	 * Run checks all policies
	 * @return {[type]} [description]
	 */
	run() {
		this.policy_index = 0
		console.log('start !!!!!!!!!!!!!!')
		return this.next()
	}

	next() {
		console.log(`length: ${this.policies.length}`)
		console.log('>>>>>>>>>>>>>>>>>')
		console.log(`index: ${this.policy_index}`)
		if (this.policy_index < this.policies.length) {
			this.policy_index += 1
			console.log('----------------------------------')
			console.log(this.policies[this.policy_index])
			this.policies[this.policy_index].approve(this)
		} else {
			return this
		}
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