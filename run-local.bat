@echo off

title=RUN LOCAL
start cmd /c "title=DiscountService & cd DiscountService/DiscountService & dotnet build & dotnet watch run" 
start cmd /c "title=ProductApi & cd ProductApi & npm rum mon"
start cmd /c "cd Frontend & ng serve -o" 



