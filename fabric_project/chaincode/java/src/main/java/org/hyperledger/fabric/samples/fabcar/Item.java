/*
 * SPDX-License-Identifier: Apache-2.0
 */

package org.hyperledger.fabric.samples.fabcar;

import java.util.Objects;

import org.hyperledger.fabric.contract.annotation.DataType;
import org.hyperledger.fabric.contract.annotation.Property;

//import com.owlike.genson.annotation.JsonProperty;


@DataType()
public final class Item {

    @Property()
    private final String name;

    @Property()
    private final String owner;

    @Property()
    private final int status;

    @Property()
    private final String id;

    @Property()
    private final int price;

    public String getOwner() {
        return owner;
    }

    public String getName() {
        return name;
    }

    public int getPrice() {
        return price;
    }

    public int getStatus() {
        return status;
    }

    public Item(final String id, final String name, final String owner, final int status, final int price) {
        this.id = id;
        this.name = name;
        this.owner = owner;
        this.status = status;
        this.price = price;
    }

    @Override
    public boolean equals(final Object obj) {
        if (this == obj) {
            return true;
        }

        if ((obj == null) || (getClass() != obj.getClass())) {
            return false;
        }

        Item other = (Item) obj;

        return Objects.deepEquals(new String[] {getName(), getOwner()},
                new String[] {other.getName(), other.getOwner()});
    }

    @Override
    public int hashCode() {
        return Objects.hash(getName(), getOwner());
    }

    @Override
    public String toString() {
        return this.getClass().getSimpleName() + "@" + Integer.toHexString(hashCode()) + " [name=" + name + ", price="
                + price + ", owner=" + owner + "]";
    }
}
