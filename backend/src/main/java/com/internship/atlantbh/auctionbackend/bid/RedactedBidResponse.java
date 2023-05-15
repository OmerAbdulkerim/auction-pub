package com.internship.atlantbh.auctionbackend.bid;

import lombok.Data;

import java.util.UUID;

@Data
public class RedactedBidResponse {

    private UUID productId;
    private UUID userId;
    private double highestPrice;
    private Integer numberOfBids;

    public RedactedBidResponse(final double highestPrice, final Integer numberOfBids, final UUID productId, final UUID userId) {
        this.productId = productId;
        this.highestPrice = highestPrice;
        this.numberOfBids = numberOfBids;
        this.userId = userId;
    }

    public UUID getProductId() {
        return productId;
    }

    public void setProductId(final UUID productId) {
        this.productId = productId;
    }

    public double getHighestPrice() {
        return highestPrice;
    }

    public void setHighestPrice(final double highestPrice) {
        this.highestPrice = highestPrice;
    }

    public Integer getNumberOfBids() {
        return numberOfBids;
    }

    public void setNumberOfBids(final Integer numberOfBids) {
        this.numberOfBids = numberOfBids;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(final UUID userId) {
        this.userId = userId;
    }
}
