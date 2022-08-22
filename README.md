# fruit-app-nodejs
## Description

This is a Red Hat OpenShift Data Access demo that is built with Node JS to demonstrate the Service Binding feature that is available in OpenShift. The application is built with a set endpoints over REST. It's aalso a great way to find out how to avoid Scurvy.

### What technology do we use?
- Node JS to build the REST endpoints
- Database (Mysql, or PostgreSql compatible DBs)
  - knex for DB migration
- Kube-service-bindings
- Compatible with [RHODA/DBaaS](https://github.com/RHEcosystemAppEng/dbaas-operator) platform

### Prerequisites
- Docker
- Node.js
- OpenShift

### build
```shell

# Build the app with Postgresql
$ docker build -f Dockerfile-pg -t quay.io/<quay_acct>/fruit-app-nodejs-pg:v0.0.1 .

# Build the app with MySQL
$ docker build -f Dockerfile-mysql -t quay.io/<quay_acct>/fruit-app-nodejs-mysql:v0.0.1 .

```

### deploy to OpenShift
```shell
# update yaml files under k8s folder to reflect your image path

# Deploy the app with Postgresql
oc apply -f k8s/deploy-nodejs-pg.yaml

# Deploy the app with MySQL
oc apply -f k8s/deploy-nodejs-mysql.yaml

```

### Commands to run currently:

- install all necessary node components
- `npm i`
- start a PostgreSQL database system using docker images
- `docker-compose up`
-  start up your server (should launch website)
- `node [app_mysql.js|app_pg.js]`

## Relevant resources

* [kube-service-bindings](https://www.npmjs.com/package/kube-service-bindings)
