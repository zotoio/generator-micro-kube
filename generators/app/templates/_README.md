# <%= name %>

This is a monorepo of microservices built using yeoman.io generator https://github.com/zotoio/generator-micro-kube

## Installation
Clone this repo, then `yarn install`.

## Structure
All service packages are in directories under /packages.   Each package results in a docker container, and associated Kubernetes resources deployable via Helm.

Each package has a standalone Dockerfile and resources for independent deployment, while also sharing global libraries and build/test/linting frameworks.

## Extending
You can add new function packages by running the yeoman generator:

```
yarn generate-package
```

..and follow the prompts. This will give you the scaffolding for a new service package.  By default Typescript nodejs service scaffolding is created.  

You will be prompted for:

- service package name, version and npm namespace

## Execution

### Test offline
Inside new package run this, then `curl localhost:8088`
```
yarn svc-docker
```

### Deploy to kubernetes
To deploy a given service package, go to the `packages/[function]` dir and run:

```
yarn svc-publish
yarn svc-deploy
```

This script will assemble inherited env vars, lint, test and compile the servcies, and deploy it to Kubernetes.

### Remove from Kubernetes
Inside new package run this.
```
yarn svc-remove
```

### Kubernetes Service logs
Inside new package run this.
```
yarn svc-logs
```
