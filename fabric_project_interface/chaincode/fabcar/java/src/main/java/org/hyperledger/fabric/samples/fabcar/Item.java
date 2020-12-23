/*
 * SPDX-License-Identifier: Apache-2.0
 */

package org.hyperledger.fabric.samples.fabcar;

import java.util.Objects;

import org.hyperledger.fabric.contract.annotation.DataType;
import org.hyperledger.fabric.contract.annotation.Property;

import com.owlike.genson.annotation.JsonProperty;


@DataType()
public final class Item {
    @Property()
    private final String id;

    @Property()
    private final String name;

    @Property()
    private final String owner;

    @Property()
    private final int status;

    @Property()
    private final int price;

    public String getID() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getOwner() {
        return owner;
    }

    public int getPrice() {
        return price;
    }

    public int getStatus() {
        return status;
    }

    public Item(@JsonProperty("id") final String id, @JsonProperty("name") final String name,
    @JsonProperty("owner") final String owner, @JsonProperty("status") final int status,
    @JsonProperty("price") final int price) {
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
        return Objects.hash(getID(), getName(), getOwner(), getPrice(), getStatus());
    }

    @Override
    public String toString() {
        return this.getClass().getSimpleName() + "@" + Integer.toHexString(hashCode()) + " [name=" + name + ", price="
                + price + ",id=" + id + ", owner=" + owner + "]";
    }
}
