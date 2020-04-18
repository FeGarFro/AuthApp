# AuthApp
### Description
It is a simple authentication app made following instructions from a [series of videos](https://www.youtube.com/watch?v=uONz0lEWft0&list=PLillGF-RfqbZMNtaOXJQiDebNXjVapWPZ) from [@bradtraversy](https://github.com/bradtraversy).

This app is built with NodeJS and is a *close* real world implementation as it is not using HTTPS protocol.

Since the tutorial I followed is from 2017, I've made some changes due to node module updates,
the intention here is to be a generic authenticantion app so it can be used in different projects by me, and others who wish to save time (or learn).

 I've put comments in the code trying to explain what was where and and what was being used at different stages.
 
 ### What I Used
 
 Since my goal was to learn more about the MEAN stack, I used MongoDB as a database, their cloud service, Atlas, to be exact, because I wouldn't need
 to download anything and to get acquainted with new technologies.
 
 The modules used in this app are:
 * Express
 * Cors
 * Json Web Token
 * Passport
 * Passport-JWT
 * Bcrypt
 * Mongoose
 * dotEnv
 
 I used a .env file to store database credentials and the Passport secret, a major difference from the videos, because, as I discovered doing research,
 this is a more secure way for passwords, secrets and other security sensitive information.
 
 It's far from perfect, but it's a good starting point, and very versatile, I imagine.
 
 You can use this any way you like, I did the actual work in coding, but all thanks goes to [@bradtraversy](https://github.com/bradtraversy)
 who created this tutorial and published for free on [YouTube](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA)
 
 ### Requests
 I sent requests using Postman to http://localhost:3000 like the following:
 
 ##### GET
 There are only two get routes:
 1. **http://localhost:3000/API/users** that gets all users and has no paramaters besides **Content-Type application/json**. This route is only for debugging purpuses
 1. **http://localhost:3000/API/users/profile** that needs an **Authorization** header with the JWT token created on login like this:
 
 **Authorization JWT *code***
 
 ##### POST
 First *POST* is on **http://localhost:3000/API/users/register** that registers a user using data from the request body as follows:
 
  ```json
  {
  "name":"NAME",
  "email": "EMAIL@DOMAIN",
  "username": "USERNAME",
  "password": "PASSWORD"
  }
  ```
  
 The password will be hashed bt bcrypt before storing to the database, GET **http://localhost:3000/API/users** to verify that
 
 Then comes login on **http://localhost:3000/API/users/auth**, the request body must be as follows:
   ```json 
     {
  "username":"USERNAME"
  "password":"PASSWORD"
  }
   ```
  First it will try to find de "USERNAME" in the database, then it will hash the password given and compare with the one stored using bcrypt. This return an JSON object as follows:
 ```json 
  {
    "success": true,
    "token": "**JWT CODE**",
    "user": {
        "id": "DB ID",
        "name": "NAME",
        "username": "USERNAME",
        "email": "EMAIL"
    },
    "msg": "Logged in"
  }
  ```
  The **JWT CODE** is a token for authentication in passport, it is to be passed to **http://localhost:3000/API/users/profile** GET request as seen above
  
  Next POST request is **http://localhost:3000/API/users/profile/delete** that authenticate using passport like in the **profile** route and authenticate the user again like the **auth** route with *username* and *password*
  
  The last one is **http://localhost:3000/API/users/profile/update**, authenticating using passport, compares *username* and *password* and verifies every key in the request body, if there is a match between the body key and the user data and it's not null or blank, it changes and updates in the database
  
  And that's how to test and implement in a front-end application.
  Any data check, like verifying if email is valid, I did in the Angular front-end as it has easy and effective ways of doing that. I will upload an example if needed.
  
