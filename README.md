# generator-micro-kube 
[![Greenkeeper badge](https://badges.greenkeeper.io/zotoio/generator-micro-kube.svg)](https://greenkeeper.io/)
[![npm version](https://badge.fury.io/js/generator-micro-kube.svg)](https://badge.fury.io/js/generator-micro-kube)
[![Build Status](https://travis-ci.org/zotoio/generator-micro-kube.svg?branch=master)](https://travis-ci.org/zotoio/generator-micro-kube)

> Microservices scaffolding for Kubernetes and Ambassador API Gateway.

## Pre-requisites

You should be familiar with Kubernetes, Helm and Docker.

- docker
- kubectl
- helm
- access to push to a docker registry such as dockerhub

.. and a valid kubectl configuration for an active Kubernetes cluster with helm tiller installed. 

## Installation

First, install [Yeoman](http://yeoman.io), yarn, and generator-micro-kube using [npm](https://www.npmjs.com/).

```bash
npm install -g yo yarn generator-micro-kube
```

Then generate your new lerna monorepo microservices project:

```bash
yo micro-kube
```

Once you have created a project, you can create packages using:
```
yarn generate-package
```

## Testing
Use the following npm script to lint, test, build, and start your service in a local docker container:
```
yarn svc-docker
```

## Deployment
A basic helm chart is generated for each package.  To deploy to Kubernetes:

1. build and publish the docker container using:
```
yarn publish
```

2. install the helm chart:
```
yarn svc-deploy
```
1. upgrade the helm chart when you have published new versions using:
```
yarn svc-upgrade
```

## Performance testing
A starting point Artillery config is generated for each package:
```
artillery.yml
```
https://artillery.io/docs/

## License

Apache-2.0 © [wyvern8](https://zoto.io)

