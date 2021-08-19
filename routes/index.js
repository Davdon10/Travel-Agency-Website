var express = require('express');
var router = express.Router();
var rg = require('random-greetings');
// var rg = require('./gc_modules/my_random');

/* GET home page. */
router.get('/', function (req, res, next) {
  // res.render('index', { title: 'Travel Experts', tcGreetings: rg.greet() });
  res.render('index', { title: 'Travel Experts', tcGreetings: rg.greet() });

});


module.exports = router;
