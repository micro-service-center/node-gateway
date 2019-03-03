const http = require('http')
const httpProxy = require('http-proxy')

/** Class for Request Handler */
class RequestHandler {
    /**
     * Create a Request Handler
     * @param {opt} x - Options needed for a request handler
     */
  constructor (opt) {
    this.validators = opt.validators
    this.requestValidator = opt.requestValidator
        // this.userValidator = opt.userValidator
        // Stackoverflow #21409199
    this.proxy = httpProxy.createProxyServer({
      agent: new http.Agent(),
      changeOrigin: true,
      target: {
        https: true
      }
    })
  }

    // WORK IN PROGRESS
    // chain(request) {
    //   return this.promises.reduce((cur, next)=>{
    //     return cur.then((res)=>{return next(res)})
    //   }, Promise.resolve(request))
    // }

    // get promises() {
    //   return this.validators.map((validator)=>{ return validator.validate})
    // }

/**
 * Process incoming request
 * @param { request } req - The incoming request object.
 * @param { respond } res - The incoming request object.
 * @return { judgement } - Processed result of a request  { rejected: 0, request: req, target_host: &lt;target_host>, target_port: &lt;target_port> }
 */
  handleRequest (req, res) {
    this.req = req
    this.res = res

        // Why not use the code below ? Stackoverflow#34930771d, time wasted here: 2 days
        // .then(this.userValidator.validate)
    this.requestValidator.validate(req)
            // .then(result => this.userValidator.validate(result))
            .then(result => this.resolveRequest(result))
            .catch(err => this.rejectRequest(err))
  }

    /**
     * resolve and Proxy request
     * @param  {object} result the result of all validations
     */
  resolveRequest (result) {
    this.req.headers.connection = 'Close'
    this.proxy.web(this.req, this.res, {target: result.target.nodes[0]})
  }

    /**
     * Function to Reject Request whenever an error is caught
     * @param  {object} err  Error Object
     */
  rejectRequest (err) {
    console.log(err)
    this.res.writeHead(err.error.http_status, {'Content-Type': 'application/json'})
    this.res.write(JSON.stringify(
            {'msg': `${err.name}`, 'code': err.error.code}
        ))
    this.res.end()
  }
}

module.exports = RequestHandler
