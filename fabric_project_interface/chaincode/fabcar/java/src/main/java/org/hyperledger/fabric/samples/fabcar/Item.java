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
    private final String name;

    @Property()
    private final String owner;

    public String getOwner() {
        return owner;
    }

    public Item(@JsonProperty("name") final String make, @JsonProperty("owner") final String owner) {
        this.name = name;
        this.owner = owner;
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
        return this.getClass().getSimpleName() + "@" + Integer.toHexString(hashCode()) + " [make=" + make + ", model="
                + model + ", color=" + color + ", owner=" + owner + "]";
    }
}
