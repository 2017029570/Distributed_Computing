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
//import org.hyperledger.fabric.shim.ChaincodeException;
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


    @Transaction(intent = Transaction.TYPE.SUBMIT)
    public Item registerItem(final Context ctx, final String name, final String owner) {
        ChaincodeStub stub = ctx.getStub();

        Item item = new Item(name, owner, 0, 0);
        String itemJSON = genson.serialize(item);
        //System.out.println(itemJSON);
        stub.putStringState(name, itemJSON);

        return item;
    }

    @Transaction(intent = Transaction.TYPE.SUBMIT)
    public Item sellMyItem(final Context ctx, final String name) {
        ChaincodeStub stub = ctx.getStub();

        String itemJSON = stub.getStringState(name);

        Item item = genson.deserialize(itemJSON, Item.class);

        String owner = item.getOwner();
        int price = item.getPrice();

        Item newItem = new Item(name, owner, 1, price);
        String newitemJSON = genson.serialize(newItem);
        //System.out.println(newitemJSON);
        stub.putStringState(name, newitemJSON);

        return newItem;
    }

    @Transaction(intent = Transaction.TYPE.SUBMIT)
    public Item buyUserItem(final Context ctx, final String name, final String owner)  {
        ChaincodeStub stub = ctx.getStub();
        String itemJSON = stub.getStringState(name);
        Item item = changeItemOwner(ctx, name, owner);
        return item;
    }

    @Transaction(intent = Transaction.TYPE.SUBMIT)
    public Item changeItemOwner(final Context ctx, final String name, final String newOwner)  {
        ChaincodeStub stub = ctx.getStub();

        String itemJSON = stub.getStringState(name);

        if (itemJSON == null || itemJSON.isEmpty()) {
            String errorMessage = String.format("Asset %d does not exist", name);
            //System.out.println(errorMessage);
        }

        Item item = genson.deserialize(itemJSON, Item.class);

        String owner = item.getOwner();
        int price = item.getPrice();

        Item newItem = new Item(name, newOwner, 2, price);
        String newItemJSON = genson.serialize(newItem);
        stub.putStringState(name, newItemJSON);

        return newItem;
    }

//    @Transaction(intent = Transaction.TYPE.EVALUATE)
    @Transaction
    public String getMyItems(final Context ctx, final String owner)  {
        ChaincodeStub stub = ctx.getStub();

        List<Item> queryResults = new ArrayList<Item>();

        QueryResultsIterator<KeyValue> results = stub.getStateByRange("", "");
        //String owner = @JsonProperty(owner);
        for (KeyValue result: results) {
            Item item = genson.deserialize(result.getStringValue(), Item.class);
            String itemOwner = item.getOwner();
            if (itemOwner.equals(owner)) {
                queryResults.add(item);
            }
        }
        final String response = genson.serialize(queryResults);
        return response;
    }


    @Transaction(intent = Transaction.TYPE.EVALUATE)
    public String getAllRegisteredItems(final Context ctx) {
        ChaincodeStub stub = ctx.getStub();

        List<Item> queryResults = new ArrayList<Item>();

        QueryResultsIterator<KeyValue> results = stub.getStateByRange("", "");

        for (KeyValue result: results) {
            Item item = genson.deserialize(result.getStringValue(), Item.class);
            queryResults.add(item);
            //System.out.println(item.toString());
        }

        final String response = genson.serialize(queryResults);
        return response;
    }

    @Transaction(intent = Transaction.TYPE.EVALUATE)
    public String getAllOrderedItems(final Context ctx) {
        ChaincodeStub stub = ctx.getStub();

        List<Item> queryResults = new ArrayList<Item>();

        QueryResultsIterator<KeyValue> results = stub.getStateByRange("", "");

        for (KeyValue result: results) {
            Item item = genson.deserialize(result.getStringValue(), Item.class);
            int status = item.getStatus();
            if (status != 0) {
                queryResults.add(item);
                //System.out.println(item.toString());
            }
        }

        String response = genson.serialize(queryResults);
        return response;
    }

}
