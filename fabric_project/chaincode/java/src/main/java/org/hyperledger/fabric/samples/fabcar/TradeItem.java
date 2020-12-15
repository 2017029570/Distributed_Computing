/*
 * SPDX-License-Identifier: Apache-2.0
 */

package org.hyperledger.fabric.samples.fabcar;

import java.util.ArrayList;
import java.util.List;

import org.hyperledger.fabric.contract.Context;
import org.hyperledger.fabric.contract.ContractInterface;
import org.hyperledger.fabric.contract.annotation.Contact;
import org.hyperledger.fabric.contract.annotation.Contract;
import org.hyperledger.fabric.contract.annotation.Default;
import org.hyperledger.fabric.contract.annotation.Info;
import org.hyperledger.fabric.contract.annotation.License;
import org.hyperledger.fabric.contract.annotation.Transaction;
import org.hyperledger.fabric.shim.ChaincodeException;
import org.hyperledger.fabric.shim.ChaincodeStub;
import org.hyperledger.fabric.shim.ledger.KeyValue;
import org.hyperledger.fabric.shim.ledger.QueryResultsIterator;

import com.owlike.genson.Genson;

//final int registered = 0;
//final int forSale = 1;
//final int soldOut = 2;

@Contract(
        name = "TradeItem",
        info = @Info(
                title = "TradeItem contract",
                description = "The hyperlegendary Item contract",
                version = "0.0.1-SNAPSHOT",
                license = @License(
                        name = "Apache 2.0 License",
                        url = "http://www.apache.org/licenses/LICENSE-2.0.html"),
                contact = @Contact(
                        email = "f.carr@example.com",
                        name = "F Carr",
                        url = "https://hyperledger.example.com")))
@Default
public final class TradeItem implements ContractInterface {

    private final Genson genson = new Genson();


    @Transaction()
    public void initLedger(final Context ctx) {
        ChaincodeStub stub = ctx.getStub();
    }


    @Transaction()
    public Item registerItem(final Context ctx, final String key, final String name, final String owner) {
        ChaincodeStub stub = ctx.getStub();

        Item item = new Item(key, name, owner, registered, 0);
        String itemJSON = genson.serialize(item);
        System.println(itemJSON);
        stub.putStringState(key, itemJSON);

        return item;
    }

    @Transaction()
    public Item sellMyItem(final Context ctx, final String id) {
        ChaincodeStub stub = ctx.getStub();

        String itemJSON = stub.getStringState(id);

        Item item = genson.deserialize(itemJSON, Item.class);

        Item newItem = new Item(item.id, item.name, item.owner, 1, item.price);
        String itemJSON = genson.serialize(item);
        System.println(itemJSON);
        stub.putStringState(id, itemJSON);

        return item;
    }

    @Transaction()
    public Item buyUserItem(final Context ctx, final String id)  {
        ChaincodeStub stub = ctx.getStub();
	
	String itemJSON = stub.getStringState(id);
	
	String owner = stub.GetCreator().toString();
	Item item = changeItemOwner(ctx, id, owner);
	return item;
    }

    @Transaction()
    public Item changeItemOwner(final Context ctx, final String id, final String newOwner)  {
        ChaincodeStub stub = ctx.getStub();

        String itemJSON = stub.getStringState(id);

        if(itemJSON == null || itemJSON.isEmpty()) {
            Strnig errorMessage = String.format("Asset %d does not exist", id);
            System.out.println(errorMessage);
        }

        Item item = genson.deserialize(itemJSON, Item.class);

        Item newItem = new Item(item.id, item.name, newOwner, item.status, item.price);
        String newItemJSON = genson.serialize(newItem);
        stub.putStringState(id, newItemJSON);

        return newItem;
    }

    @Transaction()
    public Item getMyItems(final Context ctx)  {
        ChaincodeStub stub = ctx.getStub();

        List<Item> queryResults = new ArrayList<Item>();

        QueryResultsIterator<KeyValue> results = stub.getStateByRange("", "");
        //String owner = @JsonProperty(owner);
	String owner = stub.GetCreator().toString();
        for(KeyValue result: results) {
            Item item = genson.deserialize(result.getStringValue(), Item.class);
            if(item.owner.equals(owner)) {
                queryResults.add(item);
                System.out.println(item.toString());
            }
        }

        final String response = genson.serialize(queryResults);
        return response;
    }


    @Transaction()
    public String getAllRegisteredItems(final Context ctx) {
        ChaincodeStub stub = ctx.getStub();

        List<Item> queryResults = new ArrayList<Item>();

        QueryResultsIterator<KeyValue> results = stub.getStateByRange("", "");

        for(KeyValue result: results) {
            Item item = genson.deserialize(result.getStringValue(), Item.class);
            queryResults.add(item);
            System.out.println(item.toString());
        }

        final String response = genson.serialize(queryResults);
        return response;
    }

    @Transaction()
    public String getAllOrderedItems(final Context ctx) {
        ChaincodeStub stub = ctx.getStub();

        List<Item> queryResults = new ArrayList<Item>();

        QueryResultsIterator<KeyValue> results = stub.getStateByRange("", "");

        for(KeyValue result: results) {
            Item item = genson.deserialize(result.getStringValue(), Item.class);
            if(item.status != registered) {
                queryResults.add(item);
                System.out.println(item.toString());
            }
        }

        final String response = genson.serialize(queryResults);
        return response;
    }

}
