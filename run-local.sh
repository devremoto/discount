#!/bin/bash
#sudo chmod +x ./run-local.sh && ./run-local.sh


gnome-terminal --tab --title="ProductApi" -- bash -c 'cd ./ProductApi && npm ci && npm rebuild && npm run mon' --

gnome-terminal --tab --title="frontend" -- bash -c 'cd ./Frontend  && ng serve -o --port=4200' --

gnome-terminal --tab --title="DiscountService" -- bash -c 'cd ./DiscountService/DiscountService && dotnet build && dotnet watch run' --





