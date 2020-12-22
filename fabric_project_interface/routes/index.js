var express = require('express');
var enroll = require('../fabric_js/enrollAdmin.js');
var register = require('../fabric_js/registerUser.js');
var query = require('../fabric_js/query.js');
var invoke = require('../fabric_js/invoke.js');
var router = express.Router();

let user;

/* GET home page. */
router.get('/', async function(req, res, next) {
	console.log('main page')
        if(typeof req.cookies.user != "undefined") {
            console.log("user : ", req.cookies.user);
	    var myItem = await query.query(req.cookies.user, 'getMyItems', "");

            console.log("myItem : ", myItem);

            var itemRendering = "";
            
            if(typeof myItem != "undefined") {
	        for(item of JSON.parse(myItem)) {
		        itemRendering = itemRendering +
                        "<tr><td>" + item.id + "</td>" +
			"<td>" + item.owner + "</td>" +
			"<td>" + item.name + "</td></tr>";
	        } 
        
                var category = "";	
	        for(item of JSON.parse(myItem)) {
	                category = category + "<option value='" + item.id + "'>" + item.name + "</option>";
	        }
            }       
	    var registeredItem = await query.query(req.cookies.user, "getAllRegisteredItems", "");
            var rItems = "";
            if(typeof registeredItem != "undefined") {
	        for(item of JSON.parse(registeredItem)) {
	    	        rItems = rItems + "<tr><td>" + item.id + "</td>" + "<td>" + item.owner + "</td>" + "<td>" + item.name + "</td></tr>";
	        }

                var sCategory = "";
	        for(item of JSON.parse(registeredItem)) {
		        sCategory = sCategory + "<option value='" + item.id + "'>" + item.name + "</option>";
	        }
            }
	    var itemOnSale = await query.query(req.cookies.user, 'getAllOrderedItems', "");
            var iSale = "";
            if(typeof itemOnSale != "undefined") {
	        for(item of JSON.parse(itemOnSale)) {
	    	        ISale = ISale + "<tr><td>" + item.id + "</td>" + 
                                "<td>" + item.owner + "</td>" + 
			        "<td>" + item.name + "</td>" +
			        "<td>" + item.price + "</td>" + 
			        "<td>" + item.status + "</td></tr>";
	        }
            }
 	    res.render('index', { name: req.cookies.user, myItems: itemRendering, myItemscategory: category, registeredItems: rItems, salecategory: sCategory, ItemOnSale: iSale });
        }
        res.render('index', { name: req.cookies.user });
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
 	await invoke.invoke(user, "registerItem", name);

 	res.redirect('/');
 })

router.post('/sellMyItem', async function(req, res, next) {
	user = req.body.user;
 	console.log('name : ', user);
 	await invoke.invoke(req.cookies.user, "sellMyItem", req.body.myItemscategory);

 	res.redirect('/');
 })

 router.post('/getMyItem', async function(req, res, next) {
	user = req.body.user;
 	console.log('name : ', user);
 	var result = await query.query(req.cookies.user, "getMyItems", "");
	console.log('result : ', result);

 	res.redirect('/');
 })

router.post('/buyUserItem', async function(req, res, next) {
	user = req.body.user;
	console.log('name : ', user);
	await invoke.invoke(req.cookies.user, "buyUserItem", req.body.salecategory);

	res.redirect('/');
})

module.exports = router;
