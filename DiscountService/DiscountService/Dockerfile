ARG port

FROM mcr.microsoft.com/dotnet/core-nightly/sdk AS build
WORKDIR /app/src

COPY ["DiscountService/DiscountService.csproj", "DiscountService/"]
RUN dotnet restore "DiscountService/DiscountService.csproj"
COPY . ./

RUN dotnet publish "DiscountService/DiscountService.csproj" -c Release -o out

FROM mcr.microsoft.com/dotnet/core/aspnet
WORKDIR /app

COPY --from=build /app/src/out ./

EXPOSE 80
ENTRYPOINT ["dotnet", "DiscountService.dll", " "]
