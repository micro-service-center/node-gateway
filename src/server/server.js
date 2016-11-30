const http = require('http')
const RequestHandler = require('./lib/RequestHandler')
const RequestValidator = require('./lib/RobustRequestValidator')
const UserValidator = require('./lib/UserValidator')

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

    let validator_conf = {
      conf: this.gateway_conf,
      policyFactory: policyFactory
    }

    // Request Validator
    let requestValidator = new RequestValidator(validator_conf)

    // User Validator
    let userValidator = new UserValidator(validator_conf)

    // Request Handler
    let requestHandler = new RequestHandler({ 
      requestValidator: requestValidator,
      userValidator: userValidator
    })

    this.httpServer = http.createServer((req, res) => {
      requestHandler.handleRequest(req, res)
    }).listen(this.gateway_conf.PORT)

  }

  close() {
    this.httpServer.close()
  }
}

module.exports = App