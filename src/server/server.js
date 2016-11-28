const http = require('http')
const RequestHandler = require('./lib/RequestHandler')

const RequestValidator = require('phoenix-validator').RequestValidator
// const RequestValidator = require('./lib/RequestValidator')

const PolicyFactory = require('cyanide-policy').PolicyFactory

class App {
  constructor(opt) {
    this.gateway_conf = opt.gateway_conf
    this.error_conf = opt.error_conf
    this.httpServer = null
  } 

  start () {
    
    let policyFactory = new PolicyFactory({
      policy_path: this.gateway_conf.POLICY_PATH,
      error_conf: this.error_conf  
    })

    // Request Validator
    let requestValidator = new RequestValidator({
      conf: this.gateway_conf,
      policyFactory: policyFactory
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