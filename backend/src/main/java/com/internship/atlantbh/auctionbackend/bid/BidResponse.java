package com.internship.atlantbh.auctionbackend.bid;

import lombok.Data;

import java.sql.Timestamp;
import java.util.UUID;

@Data
public class BidResponse {

    private UUID id;
    private UUID productId;
    private String name;
    private UUID userId;
    private Double price;
    private Timestamp createdAt;

    public BidResponse(final Bid bid) {
        this.id = bid.getId();
        this.productId = bid.getProduct().getId();
        this.userId = bid.getUser().getId();
        this.price = bid.getPrice();
        this.createdAt = bid.getCreatedTimestamp();
        this.name = bid.getUser().getFirstName().concat(" ").concat(bid.getUser().getLastName());
    }

    public UUID getId() {
        return id;
    }

    public void setId(final UUID id) {
        this.id = id;
    }

    public UUID getProductId() {
        return productId;
    }

    public void setProductId(final UUID productId) {
        this.productId = productId;
    }

    public UUID getUserId() {
        return userId;
    }

    public void setUserId(final UUID userId) {
        this.userId = userId;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(final Double price) {
        this.price = price;
    }

    public Timestamp getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(final Timestamp createdAt) {
        this.createdAt = createdAt;
    }
}
