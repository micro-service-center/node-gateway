```
                           __   __                  __                             __                                  
 _   __  ____ _  __  __   / /  / /_  ___   _____   / /_           ____ _  ____ _  / /_  ___  _      __  ____ _   __  __
| | / / / __ `/ / / / /  / /  / __/ / _ \ / ___/  / __ \ ______  / __ `/ / __ `/ / __/ / _ \| | /| / / / __ `/  / / / /
| |/ / / /_/ / / /_/ /  / /  / /_  /  __// /__   / / / //_____/ / /_/ / / /_/ / / /_  /  __/| |/ |/ / / /_/ /  / /_/ / 
|___/  \__,_/  \__,_/  /_/   \__/  \___/ \___/  /_/ /_/         \__, /  \__,_/  \__/  \___/ |__/|__/  \__,_/   \__, /  
                                                               /____/                                         /____/   
                                                               
                                                            
```
# Vaultech Gateway

Vaultech-gateway is a simple API Gateway, which performs the following tasks:
- rejects invalid requests
- rejects invalid users
- redirects traffic to registered services
- limits request frequency

It is built upon the node-http-proxy project. And simply configured with configuration files.

## Quickstart
#### Node Runtime Version 6.9.1 LTS
#### Installation
```shell
sudo npm install -g nodemon # Dev Only, auto restart
```
```shell
npm install # install node packages
```

#### Build Documentations
```shell
npm run build_docs # build to docs folder
```
#### Start Server
```shell
npm start # start server
```
#### Test
```shell
npm test # test
```
#### Test without Coverage
```shell
npm run naked_test
```

## Change Log
Please Refer to [https://github.com/cyanideio/vaultech-gateway/releases](https://github.com/cyanideio/vaultech-gateway/releases)
