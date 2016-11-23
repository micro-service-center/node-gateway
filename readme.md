[![CircleCI](https://circleci.com/gh/BTCChina/phoenix-gateway/tree/dev.svg?style=shield&circle-token=45015a30fe553940bcc3267a691ce2a2a5857ae6)](https://circleci.com/gh/BTCChina/phoenix-gateway/tree/dev)

```
           __                     _                        __                          
    ____  / /_  ____  ___  ____  (_)  __      ____ _____ _/ /____ _      ______ ___  __
   / __ \/ __ \/ __ \/ _ \/ __ \/ / |/_/_____/ __ `/ __ `/ __/ _ \ | /| / / __ `/ / / /
  / /_/ / / / / /_/ /  __/ / / / />  </_____/ /_/ / /_/ / /_/  __/ |/ |/ / /_/ / /_/ / 
 / .___/_/ /_/\____/\___/_/ /_/_/_/|_|      \__, /\__,_/\__/\___/|__/|__/\__,_/\__, /  
/_/                                        /____/                             /____/   
```

# Phoenix Gateway

Phoenix-gateway is a simple API Gateway, which performs the following tasks:
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
#### Test Coverage
```shell
npm run test_coverage
```

## Change Log
Please Refer to [https://github.com/BTCChina/phoenix-gateway/releases](https://github.com/BTCChina/phoenix-gateway/releases)
