'use strict'

var express = require('express')        // require express
var bodyParser = require('body-parser') // require body parser for forms
var db = require('./data.json')         // require data from json file

var port = 1950

express()
  .set('view engine', 'ejs')
  .set('views', 'views')
  .use(express.static('static'))
  .use(bodyParser.urlencoded({
    extended: false
  }))
  //.use(bodyParser.json())
  .get('/users', all)
  .get('/register', form) // Get form for adding new users
  .get('/users/:index', get)
  .delete('/:index', remove) // Remove user
  .post('/', register)
  .listen(port)

// Get all users
function all(req, res) {
  res.render('list.ejs', {
    title: 'Users',
    users: db
  })
}

// Get user's profile
function get(req, res) {
  var index = req.params.index

  if (typeof db[index] === 'undefined') { // Source https://stackoverflow.com/questions/13107855/how-to-check-if-array-element-exists-or-not-in-javascript
    var result = {code: '404', text: 'Not found'}
    res.status(404).render('error.ejs', result)
  } else {
    res.render('profile.ejs', {
      profile: db[index]
    })
  }

}

// If country exists, remove it from the array
function remove(req, res) {
  var index = req.params.index

  if (typeof data[index] === 'undefined') { // Source https://stackoverflow.com/questions/13107855/how-to-check-if-array-element-exists-or-not-in-javascript
    var result = {code: '404', text: 'Not found'}
    res.status(404).render('error.ejs', result)
  } else {
    data.splice(index, 1)
    var result = {code: '200', text: 'OK'}
    res.status(200).render('error.ejs', result)
  }

}

// Render the form
function form(req, res) {
  res.render('register.ejs')
}

// Add new country (Didn't had the time to finish this function)
function register(req, res) {
  var newCountry

  try {
    newCountry = data.add(req.body)
  } catch (err) {
    var result = {code: '422', text: 'Unprocessable entity'}
    res.status(422).render('error.ejs', result)
    return
  }
  //console.log(newCountry)
  res.redirect('/')
}
