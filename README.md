
# TS-Api-Template
[![CI](https://github.com/caiocampoos/ts-api-template/actions/workflows/CI.yml/badge.svg?branch=main)](https://github.com/caiocampoos/ts-api-template/actions/workflows/CI.yml)

  

###  Summary
This api is built with a modular arquitechture aproach, new functionality is added with new modules that share some of its services and utility, routes are registered in the server as the application develop and validation on the api side is done using JSON.schemas. 

  
  #### Pros 
- Easy to get context for how the application works
- Good for expanding functionality with code cohesion. 
- Better test structure and easy to integrate new services.

#### Cons
- Code base is bigger than other aproachs, less abstraction in favor of code clarity.

### :rocket: Requirements
- Docker 
- Docker-compose (for local development)
- NodeJs >= 18
  
### :checkered_flag: Getting started
 ```

docker-compose up -d --build

```
