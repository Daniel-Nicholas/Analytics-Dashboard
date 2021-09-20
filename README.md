# How to build and deploy
## How to build the front-end
Refer to ./react/user-admin/README.md
## How to build the back-end
Refer to ./api/README.md

## How to deploy the entire UI stack
Once the docker image for the back-end and front-end have been built, use this command to start them. Make sure you are in the following folder: `orca-control-center`
```
docker-compose up
```
To make sure the pods are up:
```
docker-compose ps
```
To delete the pods
```
docker-compose down
```