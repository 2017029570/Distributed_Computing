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
    }

    @Transaction()
    public Item sellMyItem(final Context ctx) {
        ChaincodeStub stub = ctx.getStub();
    }

    @Transaction()
    public Item butUserItem(final Context ctx)  {
        ChaincodeStub stub = ctx.getStub();
    }

    @Transaction()
    public Item changeItemOwner(final Context ctx)  {
        ChaincodeStub stub = ctx.getStub();
    }

    @Transaction()
    public Item getMyItems(final Context ctx)  {
        ChaincodeStub stub = ctx.getStub();
    }


    @Transaction()
    public String getAllRegisteredItems(final Context ctx) {
        ChaincodeStub stub = ctx.getStub();
    }

    @Transaction()
    public String getAllOrderedItems(final Context ctx) {
        ChaincodeStub stub = ctx.getStub();
    }

}
