const express = require('express');
var cors = require('cors')
const path = require('path');
const app = express(),
      bodyParser = require("body-parser");
      port = 3080;

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

// place holder for the data
const users = [];

//
// Kubernetes API configuration
//
const k8s = require('@kubernetes/client-node');
const kc = new k8s.KubeConfig();

kc.loadFromFile("/usr/src/config")
const appsV1Api = kc.makeApiClient(k8s.AppsV1Api);
const k8sApi = kc.makeApiClient(k8s.CoreV1Api);
const storageApi = kc.makeApiClient(k8s.CoreV1Api);

var pods_response = "not yet answered";
var nodes_response = "not yet answered";
var deployment_response = "not yet answered";
var storage_response = "not yet answered";
var config_map_response = "not yet answered";

//
// End of Kubernetes API configuration
//

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../my-app/build')));

app.get('/api/users', (req, res) => {
  console.log('#### api/users called!')
  res.json(users);
});

app.post('/api/user', (req, res) => {
  const user = req.body.user;
  console.log('Adding user:::::', user);
  users.push(user);
  res.json("user addedd");
});


async function scale(namespace, name, replicas) {
  // find the particular deployment
  const res = await appsV1Api.readNamespacedDeployment(name, namespace);
  let deployment = res.body;

  // edit
  deployment.spec.replicas = replicas;

  // replace
  await appsV1Api.replaceNamespacedDeployment(name, namespace, deployment);
}

app.post('/api/update-replica', (req, res) => {
  console.log('Got body:', req.body);

  console.log("namespace:", req.body.namespace);
  console.log("name     :", req.body.name);
  console.log("replicas :", req.body.replicas);

  const namespace = req.body.namespace;
  const name = req.body.name;
  const replicas = req.body.replicas;
  
  scale(namespace, name, replicas);

  res.sendStatus(200);
});

app.get('/api/pods', (req, res) => {
  console.log('start reading pods');
  k8sApi.listNamespacedPod('default').then((res) => {
    console.log(res.body);
    pods_response = res.body;    
    // Here you can process the content of the res.body to extract the name of the pods and return your own pod
});
  console.log('finished reading pods');
  res.json(pods_response);
});


app.delete('/api/pods/:name/:namespace' ,(req, res) => {
  const { name } = req.params;
  const { namespace } = req.params;

  console.log("NAME: ", name, "NAMESPACE: ", namespace);

  console.log('start deleting pod');
  k8sApi.deleteNamespacedPod(name, namespace).then((res) => {
    console.log(res.body);
    pods_response = res.body; 
  });

  console.log('finished reading nodes');
  res.json(nodes_response);
  res.sendStatus(200);
})


app.get('/api/nodes', (req, res) => {
  console.log('start reading nodes');
  k8sApi.listNode().then((res)=>{
    console.log("res.body");
    nodes_response = res.body;
  });

  console.log('finished reading nodes');
  res.json(nodes_response);
});

app.get('/api/deployments', (req, res) => {
  console.log('start reading deployments');
  appsV1Api.listNamespacedDeployment('default').then((res)=>{
    console.log("res.body");
    deployment_response = res.body;
  });

  console.log('finished reading deployments');
  res.json(deployment_response);
});


app.get('/api/storage', (req, res) => {
  console.log('start reading storage');
  storageApi.listPersistentVolume().then((res)=>{
    console.log("res.body");
    storage_response = res.body;
  });

  console.log('finished reading storage');
  res.json(storage_response);
});


app.get('/api/config-map', (req, res) => {
  console.log('start reading config maps');
  k8sApi.listConfigMapForAllNamespaces().then((res)=>{
    console.log("res.body");
    config_map_response = res.body;
  });

  console.log('finished reading config maps');
  res.json(config_map_response);
})


app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, '../my-app/build/index.html'));
});

app.listen(port, () => {
    console.log(`Server listening on the port::${port}`);
});