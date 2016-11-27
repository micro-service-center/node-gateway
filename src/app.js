const App = require('./server/server')

// Load Configuration File
const CONF_ROOT = "../conf/gateway"
const CONF_REALM = "dev"
const GATEWAY_CONFIG = require(`${CONF_ROOT}/${CONF_REALM}/gateway.json`)
const ERROR_CONFIG = require(`${CONF_ROOT}/${CONF_REALM}/error.json`)
const POLICY_CONFIG = require(`${CONF_ROOT}/${CONF_REALM}/policy.json`)

let app = new App({
  gateway_conf: GATEWAY_CONFIG,
  error_conf: ERROR_CONFIG,
  policy_conf: POLICY_CONFIG
})

app.start()