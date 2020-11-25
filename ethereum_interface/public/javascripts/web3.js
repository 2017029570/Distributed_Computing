var web3 = new Web3();
web3.setProvider(new Web3.providers.HttpProvider('http://localhost:8545'));

const contract_address = "0x163739Ab374C2B070CfbC5C2389979AE5f7D84bb";
const abi = [
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "auctionBidding",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "auctionEnd",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "address payable",
				"name": "seller",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "price",
				"type": "uint256"
			}
		],
		"name": "balanceTransfer",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "cnumber",
				"type": "uint256"
			},
			{
				"internalType": "address",
				"name": "addr",
				"type": "address"
			}
		],
		"name": "changeItemOwner",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllAuctionedItems",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "start_price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "limit_price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "register",
						"type": "bool"
					}
				],
				"internalType": "struct IAuction.Item[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getAllRegisteredItems",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "start_price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "limit_price",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "date",
						"type": "uint256"
					},
					{
						"internalType": "bool",
						"name": "register",
						"type": "bool"
					}
				],
				"internalType": "struct IAuction.Item[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getMyItems",
		"outputs": [
			{
				"internalType": "uint256[]",
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getName",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "uint256",
				"name": "start_price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "limit_price",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "date",
				"type": "uint256"
			}
		],
		"name": "registerAuctionItem",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "registerItem",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "registerName",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	}
];

let auction = new web3.eth.Contract(abi, contract_address);

$(document).ready(function() {
	startDapp();
})

var startDapp = async function() {
	getMyItems();
	getRegisteredAuctionItems();
	getClosedAuctionItems();
	getMyItemsToBeAuctioned();
	getItemsRegisteredAtAuction();
	getName();
}


var getBalance = function() {
	var address = $('#address').text();
	web3.eth.getBalance(address, function (error, balance) {
		if (!error)
			$('#balanceAmount').text(web3.utils.fromWei(balance,'ether'));
		else
			console.log('error: ', error);
	});
}

var getName = async function() {
    var address= $('#address').text();
    var name = await auction.methods.getName().call({from: address});
    $('#name').text(name);
    return name;
}

var registerName = async function() {
    var address = $('#address').text();
    var new_name = $('#change_name').text();
    await auction.methods.registerName(new_name).send({from: address, gas: 3000000});
    $('#name').text(new_name);
    return;
}


var registerForMyItem = async function() {
    var address = $('#address').text();
    var item = $('#Item').value();
    await auction.methods.registerItem(item).send({from: address, gas: 5000000});
    return;
}

var registerAuctionItem = async function() {
    var address = $('#address').text();
    var item_name = $('#nameitems-category option:selected').val();
    var start_price = parseInt($('#startingBidPrice').val());
    var limit_price = parseInt($('#upperLimitPrice').val());
    var date = dateToTimeStamp($('#dueDate').val());
    
    await auction.methods.registerAuctionItem(start_price, limit_price, date).send({from: address, gas: 5000000});
    return;
}

var auctionBidding = async function() {
    var address = $('#address').text();
    var itemID = parseInt($('#auction-category option:selected').val());
    var price = parseInt($('#bidPrice').val());
    await auction.methods.auctionBidding(itemID).send({from: address, gas: 5000000, value: price});
    return;
}

var getMyItems = async function() {
    var address = $('#address').text();
    var items = await auction.methods.getMyItems().call({from: address});
    /*for(item of JSON.parse(items)) {
        $('#myItems').append("<tr><td>" + item + "</td></tr>");
    }*/
    $('#myItems').append(items);
}

var getRegisteredAuctionItems = async function() {
    var address = $('#address').text();
    var items = await auction.methods.getRegisteredAuctionItems().call({from: address});
    /*for(item of JSON.parse(items)) {
        $("#registeredCars").append(
            "<tr><td>" + item.item + "</td>" +
            "<td>" + item.owner + "</td>" +
            "<td>" + item.start_price + "</td>" +
            "<td>" + item.limit_price + "</td>" +
            "<td>" + new Date(parseInt(item.date)) + "</td>" +
            "</tr>");
    }*/
}

var getClosedAuctionItems = async function() {
    var address = $('#address').text();
    var items = await auction.methods.getClosedAuctionItems().call({from: address});
    
}

var getMyItemsToBeAuctioned = async function() {
    var address = $('#address').text();
    var items = await auction.methods.getMyItems().call({from: address});
    $('#myitems-category').html("");
    for(item of JSON.parse(items)) {
        $('#myitems-category').append("<option value='" + item.name + "'>" + item.name + "</option>");
    }
}

var getItemsRegisteredAtAuction = async function() {
    var address = $('#address').text();
    var items = await auction.methods.getAllRegisteredItems().call({from: address});
    $('auction-category').html("");
    for(item of JSON.parse(items)) {
        $('#auction-category').append("<option value='" + item.id + "'>" + item.name + "</option>");
    }
    
}

function dateToTimeStamp(date) {
    date = date.trim();
    date = date.split(" ")
    let ymd = date[0].split("/");
    let time = date.[1].split(":");
    
    let newDate = new Date(ymd[0], parseInt(ymd[1])-1, ymd[2], time[0], time[1], time[2]);
    let timeStamp = newDate.getTime();
    return timeStamp;
}

function timeStampToDate(timeStamp) {
    let ret = new Date(parseInt(timeStamp)).toString();
    return ret;
}

