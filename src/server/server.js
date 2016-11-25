const http = require('http')
const RequestHandler = require('./lib/RequestHandler')
const RequestValidator = require('./lib/phoenix-validator/RequestValidator')

class App {
  constructor(opt) {
    this.gateway_conf = opt.gateway_conf
    this.error_conf = opt.error_conf
    this.policy_conf = opt.policy_conf
    this.httpServer = null
  } 

  start () {
    // Request Validator
    let requestValidator = new RequestValidator({
      conf: this.gateway_conf,
      policy_conf: this.policy_conf.policies, // Sequence Matters
      error_conf: this.error_conf
    })

    // let userValidator = new UserValidator({

    // })

    // Request Handler
    let requestHandler = new RequestHandler({ 
      requestValidator: requestValidator
    })

    this.httpServer = http.createServer((req, res) => {
      // Request Handler Validates
      requestHandler.handleRequest(req, res)
    }).listen(this.gateway_conf.PORT)

  }

  close() {
    this.httpServer.close()
  }
}

module.exports = App