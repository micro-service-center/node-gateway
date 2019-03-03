```
                      __                                 __                                  
   ____   ____   ____/ /  ___           ____ _  ____ _  / /_  ___  _      __  ____ _   __  __
  / __ \ / __ \ / __  /  / _ \ ______  / __ `/ / __ `/ / __/ / _ \| | /| / / / __ `/  / / / /
 / / / // /_/ // /_/ /  /  __//_____/ / /_/ / / /_/ / / /_  /  __/| |/ |/ / / /_/ /  / /_/ / 
/_/ /_/ \____/ \__,_/   \___/         \__, /  \__,_/  \__/  \___/ |__/|__/  \__,_/   \__, /  
                                     /____/                                         /____/   

```

# Node Gateway

node-gateway is a simple API Gateway, which performs the following tasks:
- rejects invalid requests
- rejects invalid users
- redirects traffic to registered services
- limits request frequency

It is built upon the node-http-proxy project. And simply configured with configuration files.

## Quickstart
#### Node Runtime Version 6.10.0 LTS
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
Please Refer to [https://bitbucket.org/teambition/tool-gateway](https://bitbucket.org/teambition/tool-gateway)
