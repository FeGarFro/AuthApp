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
 who created this tutorial and published for free on [YouTube](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA).
