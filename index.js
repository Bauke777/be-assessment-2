'use strict'

// express
const express = require('express')            // require express
const port = 1950                             // port number for Express
const app = express()                         // register express as app

// packages
const session = require('express-session')    // package for sessions
const bodyParser = require('body-parser')     // require body parser for forms
const fs = require('fs')                      // require filesystem
const bcrypt = require('bcrypt')              // hashing with bcrypt

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
  secret: 'VBGdKyb0dU/crRcBjrROh3LukCRbA2mwzK/FNVbSMMK9c5JGY5',
  resave: true,
  saveUninitialized: false
}))

// routes
app.get('/', index)                   // index
app.get('/users', showUsers)          // show a list of all users
app.get('/profile', profile)          // show users own profile
app.get('/edit', editProfileForm)     // edit users own profile
app.post('/edit', editProfile)     // edit users own profile
app.get('/matches', matches)          // show all matches
app.get('/login', loginForm)          // render login form
app.post('/login', login)             // POST login
app.get('/logout', logout)            // logout, destroy session
app.get('/signup', signupForm)        // render signup form
app.post('/signup', signup)           // POST signup
app.get('/users/:index', getUser)     // user profile page
app.delete('/users/:index', remove)         // DELETE user
app.listen(port)                      // listen on registered port

// index
function index(req, res) {

  // show profile if logged in
  if (req.session.email) {
    res.redirect('/profile')
  }
  else {
    res.redirect('/login')
  }

}

// show a list of all users
function showUsers(req, res) {

  User.find({}, function(err ,users) {
    console.log(users)
    res.render('list.ejs', {
      title: 'All users',
      users: users
    })
  })

}

// show users own profile
function profile(req, res) {

  // show profile if logged in
  if (req.session.email) {

    User.find({ email: req.session.email }, function(err ,user) {
      console.log(user)
      if (typeof user === 'undefined') {
        const result = {code: '404', text: 'Not found', detail: "This user doesn't exist"}
        res.status(404).render('error.ejs', result)
      } else {
        res.render('profile.ejs', {
          profile: user[0],
          self: true
        })
      }
    })
  }
  // redirect to login if not logged in
  else {
    res.redirect('/login')
  }

}

// edit users own profile
function editProfileForm(req, res) {

  // show profile if logged in
  if (req.session.email) {

    User.find({ email: req.session.email }, function(err ,user) {
      res.render('edit-profile.ejs', {
        title: 'Edit your profile',
        profile: user[0]
      })
    })

  }
  // redirect to login if not logged in
  else {
    res.redirect('/login')
  }

}

// GET edit users own profile
function editProfile(req, res) {

  // show profile if logged in
  if (req.session.email) {

    // create object for storing the user data
    let userData = {
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      birthday: req.body.birthday,
      description: req.body.description,
      looking_for: {
        gender: req.body.lf_gender
      }
    }

    // check if email and password are filled in
    if (!userData.email) {
      res.status(400).send('Emai is missing')
      return
    }

    // check if first_name and last_name are filled in
    if (!userData.first_name || !userData.last_name) {
      res.status(400).send('First or last name are missing')
    }

    //use schema.create to insert data into the db
    User.findOneAndUpdate({'email': req.session.email}, userData, {upsert:true}, function(err, doc){
      if (err) {
        res.status(400).send('Can not update profile.')
      }
      else {
        res.redirect('/profile')
      }
    })

  }
  else {
    res.redirect('/login')
  }

}

// show a list of all users
function matches(req, res) {

  // show profile if logged in
  if (req.session.email) {

    // get own profile info
    User.find({email: req.session.email}, function(err, user) {

      var gender = user[0].looking_for.gender

      User.find({gender: gender}, function(err, users) {

        console.log(gender)

        res.render('matches.ejs', {
          title: 'My matches',
          users: users
        })

      })

    })


  }
  // redirect to login if not logged in
  else {
    res.redirect('/login')
  }

}

// render login form
function loginForm(req, res) {
  res.render('login.ejs', {
    title: 'Login'
  })
}

// POST login
function login(req, res) {

  // bcrypt.compare(password, user.password, function (err, result) {
  //   if (result === true) {
  //     return callback(null, user)
  //   } else {
  //     return callback()
  //   }
  // })

  //
  // User.find({email: req.session.email}, (error, user) => {
  //   if (error || !user) {
  //     var err = new Error('Wrong email or password.')
  //     err.status = 401
  //     return next(err)
  //   } else {
  //     console.log('req: ', password)
  //     console.log('db: ', user.password)
  //     bcrypt.compare(req.session.password, user.password, function (err, result) {
  //       if (result === true) {
  //         req.session.userId = user._id
  //         req.session.email = req.body.email
  //         req.session.password = req.body.password
  //         return res.redirect('/profile')
  //       } else {
  //         var err = new Error('Wrong email or password.')
  //         err.status = 401
  //         return next(err)
  //       }
  //     })
  //   }
  // })

  req.session.email = req.body.email
  req.session.password = req.body.password
  res.redirect('/profile')

}

// logout, destroy session
function logout(req, res) {

  req.session.destroy(function(err) {
    if (err) {
      res.negotiate(err)
    }
    res.redirect('/')
  })

}

// Get user's profile
function getUser(req, res) {

  const id = req.params.index

  if (req.session.email) {

    User.find({ _id: id }, function(err ,user) {
      console.log(user)
      if (typeof user === 'undefined') {
        const result = {code: '404', text: 'Not found', detail: "This user doesn't exist"}
        res.status(404).render('error.ejs', result)
      } else {
        res.render('profile.ejs', {
          profile: user[0],
          self: false
        })
      }
    })
  }
  // redirect to login if not logged in
  else {
    res.redirect('/login')
  }

}

// If country exists, remove it from the array
function remove(req, res) {
  const id = req.params.index

  User.remove({ _id: id }, function(err) {
    if (err) {
      res.negotiate(err)
    }
    res.redirect('/')
  })
}

// Render the register form
function signupForm(req, res) {
  res.render('signup.ejs', {
    title: "Sign Up"
  })
}

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
      req.session.email = req.body.email
      req.session.password = req.body.password
      res.redirect('/profile')
    }
  })

}
