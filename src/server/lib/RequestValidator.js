const url = require('url')
const BaseValidator = require('./base')

/** the Request Validator */
class RequestValidator extends BaseValidator {
	/**
	 * Initialize Request Policy
	 * @param  {Object} opt Configuration Objects
	 */
	constructor(opt) {
		super(opt)
		this.request = null
	}	

	/**
	 * Parse Request URL 
	 * @private	 
	 */
	get parsed_url()	{
		return RequestValidator._parseRequestURL(this.request.url)
	}

	/**
	 * Parse Request URL 
	 * @public
	 * @return { Object } Parsed URL
	 */
	static _parseRequestURL(_url) {
		return url.parse(_url)
	}

	/**
	 * Determin request service type with path
	 * @private
	 * @return { target } Service Name
	 */
	get target() {
		return RequestValidator._getTarget(this.conf, this.pathRoot)
	}

	validate(request) {
		this.request = request
		return super.validate(request)
	}

	/**
	 * Determin request service type with path
	 * @param  {request}
	 * @return {service_name}
	 */
	static _getTarget(conf, pathRoot)	{
		return conf.SERVICES.find((service) => {
			return service.path == pathRoot
		})
	}

	/**
	 * Get Paths from configuration file
	 * @param  {conf}
	 * @return {Array}
	 */
	get pathRoot()	{
		return `/${this.parsed_url.pathname.split('/')[1]}`
	}

	/**
	 * Get Paths from configuration file
	 * @param  {conf}
	 * @return {Array}
	 */
	get paths() {
		return this.conf.SERVICES.map((service) => {
			return service.path
		})
	}

	/**
	 * Get Paths from configuration file
	 * @attribute hasAuthKey
	 * @param  {conf}
	 * @return {Array}
	 */
	get hasAuthKey() {
		return RequestValidator._hasAuthKey(this.request, this.target.auth_header)	
	}

	/**
	 * check if request needs authentication
	 * @param  {request}
	 * @param  {AUTH_KEY_NAME}
	 * @return {Boolean}
	 */
	static _hasAuthKey(request, auth_key_name) {
		// console.log(request.headers)
		return Object.keys(request.headers).indexOf(auth_key_name) > -1
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

module.exports = RequestValidator