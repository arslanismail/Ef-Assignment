# Ef-- WebService (Node | Express | Mongo | Redis)

This is a simple assignment project that i worked on and following technologies are being used in this project
* Node.js with Express Framework
* MongoDb
* Redis
* Docker and Docker-compose 
## Installation

You are required to install the following pieces of software on your machine where you want to run this web service for testing 
* Docker (CLI Support)
* Docker-compose (CLI Support)


***
#### Step 1: Navigate to the project directory by cmd or bash

```bash
cd {project_name}
``` 
***
***
#### Step 2: Now you are at the root of your project folder 
The root of the project folder contains a docker-compose.yaml file which will help us make 3 containers that are
 
* websservice_container (For Our Express App)
* cache_container (For Redis) 
* mongodb_container (For Our Database)

##### Run The Following commands

```bash
1. docker-compose build
# This command will download the images for Redis and MongoDB from docker hub and build image for our Express app and install all dependencies

2. docker-compose up -d
# This Command will basically run the images in that we made by previous build command "-d" flag will make it run in the background 
```

***



## Usage ( Postman Collection )


#### Note :
* You can get the postman collection from the root of the folder. You just need to import this file "Ef-Collection.postman_collection" in your postman to test the Apis.

 
* There are Apis that require params like postId or userId postman collection have these variables named already you just need to add the values to these params from postman's params tab. these values you can get from other Apis like create user API will return you userId and create post will return you post id later these ids could be used in other Apis to update or show specific. 


## Caching

To make the app more performant we are using "Redis" and we apply API caching for all the get requests of our web services it enhance the performance greatly.
some key points for our caching solution are 
* All get requests are cached 
* Cached keys are removed once the relevant record is updated or added for example posts API will be cached until the cache time expires or if we add any other Post
* For Testing Purpose currently we stored cache just for 4 minutes then they are automatically deleted we can alter this time if needed 


## Improvments:
There are some improvements we can do to optimize this web services which are the following
* Currently, in this app we are not using any User Authentication Process so to connect posts with users we are using a global variable and this global variable is accessed later on while creating posts so we could get the current user. now this will lead to memory leak and generally using a global variable is not a good approach if we need to improve this we can add the functionality of user authentication but that was beyond the scope of this assignment.
* We are using "Redis" to cache the get requests now cache keys are actual URLs which might not be an optimal solution because URLS could be quite long so we would need to find a better way of implementing this solution for our current application it is working perfectly though . 



## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
Arslan Ismail