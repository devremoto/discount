#!/bin/bash
#sudo chmod +x ./build-run-docker.sh && ./build-run-docker.sh

docker-compose down
docker-compose build
docker-compose up

xdg-open http://localhost:4200
