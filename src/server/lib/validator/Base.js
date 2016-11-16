const url = require('url')

/** Class for Request Validator */
class BaseValidator {

	/**
	 * Initialize the validator
	 * @param  {opt}
	 */
	constructor(opt) {
		this.conf = opt.conf
		this.validated = true		// Initialize State: true
		this.request = null			// No Request On Init
		this.pathRoot = null		// No pathRoot on Init
		this.target = null
		this.needs_auth = true	// default needs auth
	}

	/**
	 * Judges what is included in the request object
	 * @param  {request}
	 * @return {Boolean}
	 */
	approve(request) {
		throw new Error('Unimplemented')
	}

	/**
	 * Parse Request
	 * @param  {request}
	 * @return {this}
	 */
	parseRequest(request)	{
		this.request = request
		this.pathRoot = BaseValidator
			.getPathRoot(request)
		return this
	}

	/**
	 * Determin request service type with path
	 * @param  {request}
	 * @return {service_name}
	 */
	getTarget()	{
		this.conf.SERVICES.forEach((service) => {
			if (service.path == this.pathRoot) {
				this.target = service
			}
		})
	}

	/**
	 * check if Path in Services
	 * @param  {request}
	 * @return {this}
	 */
	checkPath()	{
		if (this.validated){
			this.validated = BaseValidator
				.getPathsFromConf(this.conf)
				.indexOf(this.pathRoot) > -1
		}
		return this
	}

	/**
	 * check if request needs authentication
	 * @param  {request}
	 * @return {this}
	 */
	checkAuth()	{
		if (this.validated) {
			console.log(this.getTarget())
		}
		return this
	}

	/**
	 * check if request needs authentication
	 * @param  {request}
	 * @return {this}
	 */
	done()	{
		return this
	}

	/**
	 * If Request has Header
	 * @param  {request}
	 * @return {Boolean}
	 */
	static hasHeader(request)	{

	}

	/**
	 * Get Pathroot from request object
	 * @param  {request}
	 * @return {path}
	 */
	static getPathRoot(request)	{
		return `/${this.getPath(request).split('/')[1]}`
	}

	/**
	 * Get Paths from configuration file
	 * @param  {conf}
	 * @return {Array}
	 */
	static getPathsFromConf(conf) {
		return conf.SERVICES.map((service) => {
			return service.path
		})
	}

	/**
	 * Get Path from request object
	 * @param  {request}
	 * @return {path}
	 */
	static getPath(request)	{
		return url
			.parse(request.url)
			.pathname
	}

	/**
	 * @param  {request}
	 * @return {host}
	 */
	static getHost(request) {
		return url
			.parse(request.url)
			.hostname
	}
}

module.exports = BaseValidator;