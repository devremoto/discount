@echo off
docker-compose build
docker-compose up

start http://localhost:4200
