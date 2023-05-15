package com.internship.atlantbh.auctionbackend.bid;

import java.util.UUID;

public class BidRequest {

    private UUID productId;
    private double price;

    public BidRequest(final UUID productId, final double price) {
        this.productId = productId;
        this.price = price;
    }

    public UUID getProductId() {
        return productId;
    }

    public void setProductId(final UUID productId) {
        this.productId = productId;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(final double price) {
        this.price = price;
    }
}
