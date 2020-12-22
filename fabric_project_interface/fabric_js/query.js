/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Gateway, Wallets } = require('fabric-network');
const path = require('path');
const fs = require('fs');


var query = async function(name, fun, args){
    try {
        // load the network configuration
        const ccpPath = path.resolve(__dirname, '..', 'test-network', 'organizations', 'peerOrganizations', 'org1.example.com', 'connection-org1.json');
        const ccp = JSON.parse(fs.readFileSync(ccpPath, 'utf8'));

        // Create a new file system based wallet for managing identities.
        const walletPath = path.join(process.cwd(), 'wallet');
        const wallet = await Wallets.newFileSystemWallet(walletPath);
        console.log(`Wallet path: ${walletPath}`);

        // Check to see if we've already enrolled the user.
        const identity = await wallet.get(name);
        if (!identity) {
            console.log('An identity for the user does not exist in the wallet');
            console.log('Run the registerUser.js application before retrying');
            return;
        }

        // Create a new gateway for connecting to our peer node.
        const gateway = new Gateway();
        await gateway.connect(ccp, { wallet, identity: name, discovery: { enabled: true, asLocalhost: true } });

        // Get the network (channel) our contract is deployed to.
        const network = await gateway.getNetwork('mychannel');

        // Get the contract from the network.
        const contract = network.getContract('fabcar');

        

        //execute query function
        //const result = await contract.evaluateTransaction('queryAllCars');
        //const result = await contract.evaluateTransaction(fun, ...args)
        if (fun == "getMyItems") {
            console.log("query : ", fun, name);
            const result = await contract.evaluateTransaction(fun, name);

        
            var test = JSON.parse(result);
            console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

            return test;
        }
        else {
            const result = await contract.evaluateTransaction(fun);

        
            var test = JSON.parse(result);
            console.log(`Transaction has been evaluated, result is: ${result}`);

            return test;
        }
        //query result value(string), string to json and use 
        //var test = JSON.parse(result);  -> string to json
        //console.log('test: ', test['make']);  -> use json object
        console.log(`Transaction has been evaluated, result is: ${result.toString()}`);

        // Disconnect from the gateway.
        await gateway.disconnect();
        
    } catch (error) {
        console.error(`Failed to evaluate transaction: ${error}`);
        process.exit(1);
    }
}
exports.query = query;
