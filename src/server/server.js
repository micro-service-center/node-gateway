const http = require('http')
const RequestHandler = require('./lib/RequestHandler')

const RequestValidator = require('../../tool-validator/RobustRequestValidator')

const PolicyFactory = require('tool-policy').PolicyFactory

class App {
  constructor (opt) {
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
      policyFactory: policyFactory,
      redis: this.redis
    }
        // Request Validator
    let requestValidator = new RequestValidator(validator_conf)

        // Request Handler
    let requestHandler = new RequestHandler({
      requestValidator: requestValidator
    })

    this.httpServer = http.createServer((req, res) => {
      res.setHeader('Access-Control-Allow-Origin', '*')
      res.setHeader('Access-Control-Request-Method', '*')
      res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET,POST,PUT,PATCH')
      res.setHeader('Access-Control-Allow-Headers', 'Json-Web-Token, Origin, X-Requested-With, Content-Type, Accept, Authorization')
      if (req.method.toLowerCase() == 'options') {
        res.writeHead(204, {'Content-Type': 'application/json'})
        res.end()
      } else {
        requestHandler.handleRequest(req, res)
      }
    }).listen(this.gateway_conf.PORT, () => {
      console.log(`Tool Gateway has listening on ${this.gateway_conf.PORT}`)
    })
  }

  close () {
    this.httpServer.close()
  }
}

module.exports = App
