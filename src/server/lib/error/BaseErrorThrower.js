class BaseErrorThrower {
	/**
	 * Class to Throw Errors
	 * @param  {[type]} opt [description]
	 * @return {[type]}     [description]
	 */
	constructor(opt) {
		this.conf = opt.conf
		this.name = opt.name
	}	

	throw(errorName) {
		let err = this.conf.ErrorType[errorName]
		console.error(err)
		// Log the error Here
		throw { "name": this.name, "error" : err }
	}
}

module.exports = BaseErrorThrower