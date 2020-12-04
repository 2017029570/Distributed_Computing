var express = require('express');
var enroll = require('../fabric_js/enrollAdmin.js')
var register = require('../fabric_js/registerUser.js')
var query = require('../fabric_js/query.js')
var invoke = require('../fabric_js/invoke.js')
var router = express.Router();

let user;

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log('main page')
 	res.render('index', { name: req.cookies.user });
});

router.get('/enrollAdmin', async function(req, res, next) {
	await enroll.enrollAdmin();
	res.redirect('/');
})

router.post('/registerUser', async function(req, res, next) {
	user = req.body.user;
	console.log(user);
	await register.registerUser(user);
	res.cookie('user', user);
	res.redirect('/');
})

// example, how to use json object in router
router.post('/registerItem', async function(req, res, next) {
	user = req.body.user;
 	console.log('name : ', user)
 	var result = await query.query(req.cookies.user, "registerItem", req.body.name)
	console.log('result : ', result)
	console.log('make : ', result['make'])

 	res.redirect('/');
 })

router.post('/sellMyItem', async function(req, res, next) {
	user = req.body.user;
 	console.log('name : ', user)
 	var result = await query.query(req.cookies.user, "sellMyItem", req.body.myItems-category)
	console.log('result : ', result)
	console.log('make : ', result['make'])

 	res.redirect('/');
 })

 router.post('/getMyItem', async function(req, res, next) {
	user = req.body.user;
 	console.log('name : ', user)
 	var result = await query.query(req.cookies.user, "getMyItem", "")
	console.log('result : ', result)
	console.log('make : ', result['make'])

 	res.redirect('/');
 })


module.exports = router;
