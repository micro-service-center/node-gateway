/** Class for Request Validator */
class BaseValidator {

	/**
	 * Initialize the validator
	 * @param  {opt}
	 */
	constructor(opt) {
		this.conf = opt.conf
		this.policy_conf = opt.policy_conf
	}


	get policies() {

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
	}

	validate() {
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
		return { 
			request: this.request,
			pathRoot: this.pathRoot,
			target: this.target,
			needs_auth: this.needs_auth
		}
	}

}

module.exports = BaseValidator;