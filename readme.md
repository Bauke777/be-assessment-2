# be-assessment-2

A small application for singles who love sport and want to meet up with other people.

## Installation

**If you have NOT installed MongoDB yet**

Before you start, make sure you have installed MongoDB. If you have not already done this, please read the documentation about [how to install MongoDB](https://docs.mongodb.com/manual/installation/) before you start.

**If you have installed MongoDB already**

`mongod`

`git clone https://github.com/Bauke777/be-assessment-2.git`

`cd be-assessment-2`

`npm install`

`node .`

The application will run at `localhost:1950`, you can change the port number in `index.js`.

## Technology

### Development Environment

In this project I will use

* JavaScript
* Node.js
* Express (JS framework)
* MongoDB (Database)

### Dependencies

Following packages are used

* installation of MongoDB is required
* body-parser (for parsing incoming requests)
* express (to make the application run)
* nodemon (restarting server when changes occur)
* mongoose (object data modeling to simplify interactions with MongoDB)
* bcrypt (for hashing and salting passwords)
* express session (to handle sessions)
* connect-mongo (for storing sessions in MongoDB)
