# Rescue Swipes 
***
This is Group 2 of Advance Challenges in Web Technologies' Coursework. 
It is a web application that was built using microservice architecture and was containerized using Docker

## Setup
***
Since the application is built on Docker no other prerequisite software is needed other than Docker.
The following steps instruct how to get the application started.

- `$ git clone https://github.com/NinthAutumn/com3014CW2Group2.git`
- `$ cd com3014CW2Group2`
- Create a .env file on the following folders auth-service, email-service, interface-service, matching-service and user-service. The `.env` file should contain the following.
```
JWT_SECRET="asdf"
USER_SERVICE_URL=http://0.0.0.0:3001/
EMAIL_SERVICE_URL=http://0.0.0.0:3002/
PG_CONNECTION_STRING=postgres://username:password@localhost:5432/tinder 
```
- Create an `application.yml` on the `com3014CW2Group2/pet-service/config` and `com3014CW2Group2/shelter-service/config` folder. The `application.yml` should contain the following.
```
JWT_SECRET: "asdf"
```
- Build and start all the Docker containers 
`$ docker-compose up --build`
