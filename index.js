'use strict'

const express = require('express')        // require express
const fs = require('fs')                  // require filesystem
const bodyParser = require('body-parser') // require body parser for forms
const db = require('./data.json')         // require data from json file

const port = 1950

express()
  .set('view engine', 'ejs')
  .set('views', 'views')
  .use(express.static('static'))
  .use(bodyParser.urlencoded({
    extended: false
  }))
  .use(bodyParser.json())
  .get('/users', all)
  .get('/register', form) // Get form for adding new users
  .get('/users/:index', get)
  .delete('/:index', remove) // Remove user
  .post('/', register)
  .get('/', login)
  .listen(port)

// Render the register form
function login(req, res) {
  res.render('login.ejs', {
    title: 'Login'
  })
}

// Get all users
function all(req, res) {
  res.render('list.ejs', {
    title: 'All users',
    users: db
  })
}

// Get user's profile
function get(req, res) {
  const index = req.params.index

  if (typeof db[index] === 'undefined') { // Source https://stackoverflow.com/questions/13107855/how-to-check-if-array-element-exists-or-not-in-javascript
    const result = {code: '404', text: 'Not found'}
    res.status(404).render('error.ejs', result)
  } else {
    res.render('profile.ejs', {
      profile: db[index]
    })
  }

}

// If country exists, remove it from the array
function remove(req, res) {
  const index = req.params.index

  if (typeof data[index] === 'undefined') { // Source https://stackoverflow.com/questions/13107855/how-to-check-if-array-element-exists-or-not-in-javascript
    const result = {code: '404', text: 'Not found'}
    res.status(404).render('error.ejs', result)
  } else {
    data.splice(index, 1)
    const result = {code: '200', text: 'OK'}
    res.status(200).render('error.ejs', result)
  }

}

// Render the register form
function form(req, res) {
  res.render('register.ejs')
}

// Add new user
function register(req, res) {

  try {
    console.log(req.body)
    // checkForm(req.body)

    var jsonStr = JSON.stringify(db)

    var obj = JSON.parse(jsonStr)
    obj.push(req.body)
    jsonStr = JSON.stringify(obj, null, '\t')

    fs.writeFile("data.json", jsonStr, function (err) {
      if (err) {
        return next(err)
      } else {
        return res.redirect('/users');
      }
    })
  }
  catch (err) {
    console.log("register error");
    const result = {code: '422', text: 'Unprocessable entity'}
    res.status(422).render('error.ejs', result)
    return err
  }
}

// function checkForm(form) {
//
//   try {
//     form.gender = Boolean(form.gender)
//   }
//   catch(err) {
//     const result = {code: '422', text: 'Unprocessable entity'}
//     res.status(422).render('error.ejs', result)
//     return
//   }
//
// }
