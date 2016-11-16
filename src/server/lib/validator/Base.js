const url = require('url')

/** Class for Request Validator */
class BaseValidator {
	/**
	 * Initialize the validator
	 * @param  {opt}
	 */
	constructor(opt) {
		this.conf = opt.conf
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
	 * Determin request service type with path
	 * @param  {request}
	 * @return {service_name}
	 */
	getTarget(request)	{

	}

	/**
	 * If Request has Header
	 * @param  {request}
	 * @return {Boolean}
	 */
	static hasHeader(request)	{

	}

	/**
	 * If Request has Path
	 * @param  {request}
	 * @param  {pathname}
	 * @return {Boolean}
	 */
	static hasPath(request, pathname)	{

	}

	/**
	 * Path in Services
	 * @param  {request}
	 * @return {path}
	 */
	pathInServices(request)	{
		return BaseValidator.getPathsFromConf(this.conf).indexOf(BaseValidator.getPathRoot(request)) > -1
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
		return url.parse(request.url).pathname
	}

	/**
	 * @param  {request}
	 * @return {host}
	 */
	static getHost(request) {
		return url.parse(request.url).hostname
	}
}

module.exports = BaseValidator;