const App = require('./server/server')

const GATEWAY_CONFIG = require(`./config/gateway`)
const ERROR_CONFIG = require(`../tool-policy-store/error.json`)

process.on('unhandledRejection', (reason, p) => {
})

let app = new App({
  gateway_conf: GATEWAY_CONFIG,
  error_conf: ERROR_CONFIG
})

app.start()
