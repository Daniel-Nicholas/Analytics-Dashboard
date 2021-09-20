# API server
This server is to expose a REST interface that calls the Kubernetes APIs.

## How to build the docker image
Make sure you are in the `/orca-control-center/api` folder and run this command:
```
docker build . -t local/api:v1
```

## server.js
`server.js` creates the REST interface.

### kubectl configuration

The kubectl configuration file can be found using 2 methods:
  * method 1) by calling kc.loadFromDefault();
  * method 2) by kc.loadFromFile("path-to-config") 

We use method 2 because it gives us the ability to set the path to the config file, which is useful since the default path for kubectl inside a docker container is unclear.

We rely on docker-compose for copying the kubeconfig file into the docker container. Update the path to suit your environment.
The path for the config file is defined in docker-compose.yaml like so:
```
     volumes:
         - /c/Users/danjou/.kube:/usr/src/
```

### Endpoints
There are currently 2 endpoints configured:
  * GET /api/pods
  * GET /api/nodes

Curl commands to call the REST endpoints:
```
 curl --location --request GET 'http://localhost:3080/api/pods'
 curl --location --request GET 'http://localhost:3080/api/nodes'
```

We use variables `pods_response` and `nodes_response` to store the results of the Kubernetes API calls.

**TODO**: Add more variables as you expand this REST interface.

The REST endpoints are synchronous, but the Kubernetes APIs are asynchronous. As a result, the REST endpoints will return a response before the Kubernetes API has fulfilled the request. This is why the first time you call a REST endpoint, you get `not yet answered` response, and the second time you call it, you get real data.

**TODO**: Improve this behaviour by using Watchers.


