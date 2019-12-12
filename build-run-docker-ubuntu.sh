#!/bin/bash
#sudo chmod +x ./build-run-docker-ubuntu.sh && ./build-run-docker-ubuntu.sh


gnome-terminal --tab --title="Docker-Compose" -- bash -c 'docker-compose down && docker-compose build && docker-compose up' --
xdg-open http://localhost:4200
