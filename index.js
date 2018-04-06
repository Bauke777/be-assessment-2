'use strict'

const express = require('express')        // require express
const fs = require('fs')                  // require filesystem
const bodyParser = require('body-parser') // require body parser for forms
const jsonDB = require('./data.json')     // require data from json file

const port = 1950                         // port number for Express

const mongo = require('./database/database.js')         // MongoDB connection
const User = require('./database/models/user.js')

express()
  .set('view engine', 'ejs')
  .set('views', 'views')
  .use(express.static('static'))
  .use(bodyParser.urlencoded({
    extended: false
  }))
  .use(bodyParser.json())
  .get('/', all)
  .get('/singup', singupForm) // Get form for adding new users
  .get('/users/:index', profile)
  .delete('/:index', remove) // Remove user
  .post('/', singup)
  .get('/login', login)
  .listen(port)

// Render the register form
function login(req, res) {
  res.render('login.ejs', {
    title: 'Login'
  })
}

// Get all users
function all(req, res) {
  User.find({}, function(err ,users) {
    console.log(users);
    res.render('list.ejs', {
      title: 'All users',
      users: users
    })
  })
}

// Get user's profile
function profile(req, res) {

  const index = req.params.index

  User.find({_id: index},
    function(err ,user) {
      if (typeof user === 'undefined') {
        const result = {code: '404', text: 'Not found', detail: "This user doesn't exist"}
        res.status(404).render('error.ejs', result)
      } else {
        res.render('profile.ejs', {
          profile: user
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
function singupForm(req, res) {
  res.render('singup.ejs')
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
function singup(req, res) {

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
  res
    .status(400)
    .send('Emai or password are missing')
  return
  }

  // check if first_name and last_name are filled in
  if (!userData.first_name || !userData.last_name) {
  res
    .status(400)
    .send('First or last name are missing')
  return
  }

  //use schema.create to insert data into the db
  User.create(userData, function (err, user) {
    if (err) {
      console.log(err)
    } else {
      return res.redirect('/');
    }
  });

}
