
# TS-Api-Template
```markdown
![CI](https://img.shields.io/badge/build-passing-brightgreen?logo=appveyor&logoColor=white)

Simple API template to help speed up development of new Applications

  

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