'use strict'

// express
const express = require('express')            // require express
const port = 1950                             // port number for Express
const app = express()                         // register express as app

// packages
const session = require('express-session')    // package for sessions
const bodyParser = require('body-parser')     // require body parser for forms
const fs = require('fs')                      // require filesystem
const jsonDB = require('./data.json')         // require data from json file
// const bcrypt = require('bcrypt')              // hashing with bcrypt

// mongodb database
const mongo = require('./database/database.js')   // mongoDB connection
const User = require('./database/models/user.js') // mongoose models

// set the default view folder
app.set('view engine', 'ejs')
app.set('views', 'views')

// middleware function for serving static files like css, images, js etc.
app.use(express.static('static'))

// bodyparser for recieving form data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
  extended: false
}))

// register sessions
app.use(session({
  secret: 'work hard',
  resave: true,
  saveUninitialized: false
}))

// routes
app.get('/', all)                 // index
app.get('/login', loginForm)      // render login form
app.post('/login', login)         // POST login
app.get('/signup', signupForm)    // render signup form
app.post('/signup', signup)       // POST signup
app.get('/users/:index', profile) // profile page
app.delete('/:index', remove)     // DELETE user
app.listen(port)                  // listen on registered port

// index
function all(req, res) {
  User.find({}, function(err ,users) {
    console.log(users);
    res.render('list.ejs', {
      title: 'All users',
      users: users
    })
  })
}

// render signup form
function loginForm(req, res) {
  res.render('login.ejs', {
    title: 'Login'
  })
}

// POST login
function login(req, res) {

  // create object for storing the user data
  req.session.email = req.body.email
  req.session.password = req.body.password
  res.end('done')

  //authenticate input against database
  // User.statics.authenticate = function (email, password, callback) {
  //   User.findOne({ email: email })
  //     .exec(function (err, user) {
  //       if (err) {
  //         return callback(err)
  //       } else if (!user) {
  //         var err = new Error('User not found.');
  //         err.status = 401;
  //         return callback(err);
  //       }
  //       bcrypt.compare(password, user.password, function (err, result) {
  //         if (result === true) {
  //           return callback(null, user);
  //         } else {
  //           return callback();
  //         }
  //       })
  //     });
  // }

}

// Get user's profile
function profile(req, res) {

  const index = req.params.index

  console.log(index);

  User.find({ _id: index },
    function(err ,user) {
      console.log(user);
      if (typeof user === 'undefined') {
        const result = {code: '404', text: 'Not found', detail: "This user doesn't exist"}
        res.status(404).render('error.ejs', result)
      } else {
        res.render('profile.ejs', {
          profile: user[0]
        })
      }
    })

}

// If country exists, remove it from the array
function remove(req, res) {
  const index = req.params.index

  if (typeof jsonDB[index] === 'undefined') { // Source https://stackoverflow.com/questions/13107855/how-to-check-if-array-element-exists-or-not-in-javascript
    const result = {code: '404', text: 'Not found'}
    res.status(404).render('error.ejs', result)
  } else {
    jsonDB.splice(index, 1)
    const result = {code: '200', text: 'OK'}
    res.status(200).render('error.ejs', result)
  }

}

// Render the register form
function signupForm(req, res) {
  res.render('signup.ejs', {
    title: "Sign Up"
  })
}

// Add new user
// function register(req, res) {
//
//   try {
//     console.log(req.body)
//     // checkForm(req.body)
//
//     var jsonStr = JSON.stringify(jsonDB)
//
//     var obj = JSON.parse(jsonStr)
//     obj.push(req.body)
//     jsonStr = JSON.stringify(obj, null, '\t')
//
//     fs.writeFile("data.json", jsonStr, function (err) {
//       if (err) {
//         return next(err)
//       } else {
//         return res.redirect('/users');
//       }
//     })
//   }
//   catch (err) {
//     console.log("register error");
//     const result = {code: '422', text: 'Unprocessable entity'}
//     res.status(422).render('error.ejs', result)
//     return err
//   }
// }

// Add new user
function signup(req, res) {

  // create object for storing the user data
  let userData = {
    email: req.body.email,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    password: req.body.password,
    profile_picture: req.body.profile_picture,
    gender: req.body.gender,
    birthday: req.body.birthday,
    description: req.body.description
  }

  // check if email and password are filled in
  if (!userData.email || !userData.password) {
    res.status(400).send('Emai or password are missing')
    return
  }

  const min = 6
  const max = 50

  if (userData.password.length < min || userData.password.length > max) {
    res.status(400).send('Password must be between ' + min + ' and ' + max + ' characters')
    return
  }

  // check if first_name and last_name are filled in
  if (!userData.first_name || !userData.last_name) {
    res.status(400).send('First or last name are missing')
  }

  //use schema.create to insert data into the db
  User.create(userData, function (err, user) {
    if (err) {
      console.log(err)
    } else {

      res.redirect('/');
    }
  });



}
