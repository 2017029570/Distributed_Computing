var express = require('express');
var enroll = require('../fabric_js/enrollAdmin.js');
var register = require('../fabric_js/registerUser.js');
var query = require('../fabric_js/query.js');
var invoke = require('../fabric_js/invoke.js');
var router = express.Router();

let user;
var myItems;
var registeredItems;
var itemOnSale;
var myItemsCategory;
var saleCategory
/* GET home page. */

function JsonToHTML(query) {
        var ret = "";
        if(query) {
            for(item of JSON.parse(query)) {
                ret = ret + "<tr><td>" + item.iD + "</td>" +
			"<td>" + item.record.owner + "</td>" +
			"<td>" + item.record.name + "</td></tr>";
                

            }
        }
        return ret;
}

function JsonToHTML2(query) {
        var ret = "";
        if(query) {
            for(item of JSON.parse(query)) {
                ret = ret + "<tr><td>" + item.iD + "</td>" + 
                        "<td>" + item.record.owner + "</td>" + 
			"<td>" + item.record.name + "</td>" +
			"<td>" + item.record.price + "</td>" + 
			"<td>" + item.record.status + "</td></tr>";

            }
        }
        return ret;
}

function JsonToCategory(query) {
        var ret = "";
        if(query) {
            for(item of JSON.parse(query)) {
                ret = ret + "<option value='" + item.iD + "'>" + item.record.name + "</option>";
            }
        }
        return ret;
}

router.get('/', async function(req, res, next) {
	console.log('main page');
        console.log("user : ", req.cookies.user);
        /*if(typeof req.cookies.user != undefined) {
            var result1 = await query.query(req.cookies.user, 'getMyItems', []);
            var result2 = await query.query(req.cookies.user, 'getAllRegisteredItems', []);
            var result3 = await query.query(req.cookies.user, 'getAllOrderedItems', []);
            myItems = JsonToHTML(result1);
            myItemsCatogory = JsonToCategory(result1);
            registeredItems = JsonToHTML(result2);
            itemOnSale = JsonToHTML2(result3);
            saleCategory = JsonToCategory(result3);
        }*/
        res.render('index', { name: req.cookies.user, myItems: myItems, myItemscategory: myItemsCategory, registeredItems: registeredItems, salecategory: saleCategory, ItemOnSale: itemOnSale });

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
        
        var result1 = await query.query(req.cookies.user, 'getMyItems', []);
        var result2 = await query.query(req.cookies.user, 'getAllRegisteredItems', []);
        var result3 = await query.query(req.cookies.user, 'getAllOrderedItems', []);
        myItems = JsonToHTML(result1);
        myItemsCategory = JsonToCategory(result1);
        registeredItems = JsonToHTML(result2);
        itemOnSale = JsonToHTML2(result3);
        saleCategory = JsonToCategory(result3);

        res.render('index', { name: req.cookies.user, myItems: myItems, myItemscategory: myItemsCategory, registeredItems: registeredItems, salecategory: saleCategory, ItemOnSale: itemOnSale });
 	res.redirect('/');
 })

router.post('/sellMyItem', async function(req, res, next) {
	user = req.body.user;
 	console.log('name : ', user);
 	await invoke.invoke(req.cookies.user, "sellMyItem", req.body[myItemscategor]);
        var result1 = await query.query(req.cookies.user, 'getMyItems', []);
        var result2 = await query.query(req.cookies.user, 'getAllRegisteredItems', []);
        var result3 = await query.query(req.cookies.user, 'getAllOrderedItems', []);
        myItems = JsonToHTML(result1);
        myItemsCategory = JsonToCategory(result1);
        registeredItems = JsonToHTML(result2);
        itemOnSale = JsonToHTML2(result3);
        saleCategory = JsonToCategory(result3);

        res.render('index', { name: req.cookies.user, myItems: myItems, myItemscategory: myItemsCategory, registeredItems: registeredItems, salecategory: saleCategory, ItemOnSale: itemOnSale });

 	res.redirect('/');
 })

router.post('/buyUserItem', async function(req, res, next) {
	user = req.body.user;
	console.log('name : ', user);
	await invoke.invoke(req.cookies.user, "buyUserItem", req.body[salecategory]);
        var result1 = await query.query(req.cookies.user, 'getMyItems', []);
        var result2 = await query.query(req.cookies.user, 'getAllRegisteredItems', []);
        var result3 = await query.query(req.cookies.user, 'getAllOrderedItems', []);
        myItems = JsonToHTML(result1);
        myItemsCategory = JsonToCategory(result1);
        registeredItems = JsonToHTML(result2);
        itemOnSale = JsonToHTML2(result3);
        saleCategory = JsonToCategory(result3);

        res.render('index', { name: req.cookies.user, myItems: myItems, myItemscategory: myItemsCategory, registeredItems: registeredItems, salecategory: saleCategory, ItemOnSale: itemOnSale });


	res.redirect('/');
})

module.exports = router;
