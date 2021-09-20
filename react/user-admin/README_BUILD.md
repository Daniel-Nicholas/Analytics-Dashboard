# How to build user-admin
## Build the react application
```
npm install
npm run-script build
```
## Build the docker image
cd into the root folder of this git repo and run this command.
```
docker build . -t local/uwf-sample-applications:v1
```
## Useful aliases
Alternatively you can create these aliases
```
alias react_build='time npm install; npm run-script build'
alias docker_build='time docker build . -t local/uwf-sample-applications:v1'
```