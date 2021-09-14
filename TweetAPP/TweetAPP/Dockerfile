FROM mcr.microsoft.com/dotnet/aspnet:3.1-focal AS base
WORKDIR /app
EXPOSE 5000

ENV ASPNETCORE_URLS=http://+:5000


FROM mcr.microsoft.com/dotnet/sdk:3.1-focal AS build
WORKDIR /src
COPY ["TweetAPP.csproj", "./"]
RUN dotnet restore "TweetAPP.csproj"
COPY . .
WORKDIR "/src/."
RUN dotnet build "TweetAPP.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "TweetAPP.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "TweetAPP.dll"]
