const App = require('./server/server')

// Load Configuration File
const GATEWAY_CONFIG = require('./server/conf/gateway.json')
const ERROR_CONFIG = require('./server/conf/error.json')

let app = new App({
  gateway_conf: GATEWAY_CONFIG,
  error_conf: ERROR_CONFIG
})

app.start()