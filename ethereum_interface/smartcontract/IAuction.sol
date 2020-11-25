pragma solidity ^0.5;
pragma experimental ABIEncoderV2;


contract IAuction{
    struct User {
        string name;
        uint[] items;
    }
    
    struct Item {
        uint id;
        string name;
        address owner;
        uint start_price;
        uint limit_price;
        uint date;
        bool register;
    }
    
    uint item_id = 0;
    uint registerNum = 0;
    mapping (address => User) internal _Users;
    mapping (uint => Item) internal _Items;
    //ItemInAuction[] internal _RegisteredItems;
    
    
    function registerItem(string memory name) public {
        _Items[item_id] = Item({
            id : item_id,
            name : name,
            owner : msg.sender,
            start_price : 0,
            limit_price : 0,
            date : 0,
            register : false
        });
        
        _Users[msg.sender].items.push(item_id);
        item_id++;
    }
    
    function registerName(string memory name) public {
        _Users[msg.sender] = User({
            name : name,
            items : new uint[](0)
        });
    }
    
    function registerAuctionItem(uint start_price, uint limit_price, uint date) public {
        require(start_price <= limit_price);
        require(now < date);
        
        User memory user = _Users[msg.sender];
        
        for(uint i = 0; i < user.items.length; i++) {
            /*Item memory item = _Items[user.items[i]];
            _RegisteredItems.push(ItemInAuction({
                itemID : item.id,
                name : item.name,
                owner : item.owner,
                registerID : _RegisteredItems.length,
                start_price : start_price,
                limit_price : limit_price,
                date : date
                end : false
            }));*/
            uint id = user.items[i];
            _Items[id].register = true;
            _Items[id].start_price = start_price;
            _Items[id].limit_price = limit_price;
            _Items[id].date = date;
        }
        
        registerNum ++;
    }
    
    function auctionBidding(uint id) payable public {
        Item memory item = _Items[id];
        require(now <= item.date && item.register == true);
        
        address(uint160(item.owner)).transfer(item.start_price);
        
        _Items[id].owner = msg.sender;
        _Items[id].start_price = msg.value;
        
        if(item.start_price == item.limit_price) {
            auctionEnd(id);
        }
    }
    
    function auctionEnd(uint id) payable public {
        registerNum--;
        changeItemOwner(id, msg.sender);
        
        require(_Items[id].register == true);
        
        Item memory item = _Items[id];
        
        _Items[id].register = false;
        
        address payable seller = address(uint160(item.owner));
        uint amount = item.start_price;
        
        balanceTransfer(seller, amount);
    }
    
    function balanceTransfer(address payable seller, uint price) payable public {
        seller.transfer(price);
    }
    
    function changeItemOwner(uint cnumber, address addr) public {
        _Items[cnumber].owner = addr;
        _Items[cnumber].register = false;
        _Users[addr].items.push(cnumber);
        
        for(uint i = 0; i < _Users[msg.sender].items.length; i++) {
            if(_Users[msg.sender].items[i] == cnumber) {
                delete _Users[msg.sender].items[i];
                break;
            }
        }
    }
    
    function getMyItems() public view returns(uint[] memory) {
        uint[] memory userItems = _Users[msg.sender].items;
        return userItems;
    }
    
    function getName() public view returns(string memory) {
        return _Users[msg.sender].name;
    }
    
    function getAllRegisteredItems() public view returns(Item[] memory) {
        Item[] memory _RegisteredItems = new Item[](registerNum);
        uint cnt = 0;
        
        for(uint i = 0; i<item_id; i++) {
            if(_Items[i].register == true) {
                _RegisteredItems[cnt++] = _Items[i];
            }
        }
        
        return _RegisteredItems;
    }
    
    function getAllAuctionedItems() public view returns(Item[] memory) {
        Item[] memory _EndedItems = new Item[](item_id - registerNum);
        uint cnt = 0;
        
        for(uint i = 0; i <item_id; i++) {
            if(_Items[i].register == false) {
                _EndedItems[cnt++] = _Items[i];
            }
        }
        
        return _EndedItems;
    }
}