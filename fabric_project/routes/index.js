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
	$('#name').text(req.body.user);
	var myItem = query.query(req.cookies.user, 'getMyItems', "");

	for(item of JSON.parse(myItem)) {
		$("#myItems").append(
			"<tr><td>" + item.id + "</td>" +
			"<td>" + item.owner + "</td>" +
			"<td>" + item.name + "</td></tr>");
	}
	
	for(item of JSON.parse(myItem)) {
		$('#myItems-category').append("<option value='" + item.id + "'>" + item.name + "</option>");
	}

	var registeredItem = query.query(req.cookies.user, 'getAllRegisteredItem', "");
	for(item of JSON.parse(registeredItem)) {
		$('#registeredItems').append(
			"<tr><td>" + item.id + "</td>" +
			"<td>" + item.owner + "</td>" +
			"<td>" + item.name + "</td></tr>");
	}
	
	for(item of JSON.parse(registeredItem)) {
		$('#sale-category').append("<option value='" + item.id + "'>" + item.name + "</option>");
	}

	var itemOnSale = query.query(req.cookies.user, 'getAllOrderedItem', "");
	for(item of JSON.parse(itemOnSale)) {
		$('#ItemOnSale').append(
			"<tr><td>" + item.id + "</td>" +
			"<td>" + item.owner + "</td>" + 
			"<td>" + item.name + "</td>" +
			"<td>" + item.price + "</td>" + 
			"<td>" + item.status + "</td></tr>");
	}
	console.log('myItem : ', myItem);
});	

router.get('/enrollAdmin', async function(req, res, next) {
	await enroll.enrollAdmin();
	res.redirect('/');
});

router.post('/registerUser', async function(req, res, next) {
	user = req.body.user;
	console.log(user);
	await register.registerUser(user);
	res.cookie('user', user);
	res.redirect('/');
})

// example, how to use json object in router
router.post('/registerItem', async function(req, res, next) {
	name = req.body.name;
	user = req.cookies.user;
 	console.log('registerItem name : ', name, user);
 	var result = await query.query(user, "registerItem", name)
	console.log('result : ', result)

 	res.redirect('/');
 })

router.post('/sellMyItem', async function(req, res, next) {
	user = req.body.user;
 	console.log('name : ', user);
 	var result = await query.query(req.cookies.user, "sellMyItem", req.body.myItems-category);
	console.log('result : ', result);
	console.log('make : ', result['make']);

 	res.redirect('/');
 })

 router.post('/getMyItem', async function(req, res, next) {
	user = req.body.user;
 	console.log('name : ', user);
 	var result = await query.query(req.cookies.user, "getMyItem", "");
	console.log('result : ', result);
	console.log('make : ', result['make']);

 	res.redirect('/');
 })

router.post('/buyUserItem', async function(req, res, next) {
	user = req.body.user;
	console.log('name : ', user);
	var result = await query.query(req.cookies.user, "buyUserITem", req.body.sale-category);
	console.log('result : ', result);
	console.log('make : ', result['make']);

	res.redirect('/');
})

module.exports = router;
