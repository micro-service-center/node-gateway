const url = require('url')
const BaseValidator = require('./_base')

/** the Request Validator */
class RequestValidator extends BaseValidator {
	/**
	 * Initialize Request Policy
	 * @param  {Object} opt Configuration Objects
	 */
	constructor(opt) {
		super(opt)
		this.request = opt.request
	}	

	/**
	 * Parse Request URL 
	 * @private	 
	 */
	get parsed_url()	{
		return RequestPolicy._parseRequestURL(this.request.url)
	}

	/**
	 * Parse Request URL 
	 * @public
	 * @return { Object } Parsed URL
	 */
	static _parseRequestURL(url) {
		return url.parse(url)
	}

	/**
	 * Determin request service type with path
	 * @private
	 * @return { target } Service Name
	 */
	get target()	{
		return RequestPolicy._getTarget(this.conf)	
	}

	/**
	 * Determin request service type with path
	 * @param  {request}
	 * @return {service_name}
	 */
	static _getTarget(conf)	{
		var target = null
		conf.SERVICES.forEach((service) => {
			if (service.path == this.pathRoot) {
				target = service
			}
		})
		return target
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
	get hasAuthKey(){
		return RequestValidator.hasAuthKey(this.request, this.conf.AUTH_KEY_NAME)	
	}

	/**
	 * check if request needs authentication
	 * @param  {request}
	 * @param  {AUTH_KEY_NAME}
	 * @return {Boolean}
	 */
	static hasAuthKey(request, AUTH_KEY_NAME)	{
		// console.log(request.headers)
		return Object.keys(request.headers).indexOf(AUTH_KEY_NAME) > -1
	}

}

module.exports = RequestValidator