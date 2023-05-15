package com.internship.atlantbh.auctionbackend.bid;

import com.internship.atlantbh.auctionbackend.image.ProductImage;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.Set;
import java.util.UUID;

@AllArgsConstructor
@NoArgsConstructor
@Builder
public class BidsTableResponse {
    private UUID bidId;
    private String productName;
    private Timestamp endDate;
    private double myBid;
    private int totalBids;
    private double highestBid;
    private UUID productId;
    private Set<ProductImage> imageUrls;

    public UUID getBidId() {
        return bidId;
    }

    public void setBidId(final UUID bidId) {
        this.bidId = bidId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(final String productName) {
        this.productName = productName;
    }

    public Timestamp getEndDate() {
        return endDate;
    }

    public void setEndDate(final Timestamp endDate) {
        this.endDate = endDate;
    }

    public double getMyBid() {
        return myBid;
    }

    public void setMyBid(final double myBid) {
        this.myBid = myBid;
    }

    public int getTotalBids() {
        return totalBids;
    }

    public void setTotalBids(final int totalBids) {
        this.totalBids = totalBids;
    }

    public double getHighestBid() {
        return highestBid;
    }

    public void setHighestBid(final double highestBid) {
        this.highestBid = highestBid;
    }

    public UUID getProductId() {
        return productId;
    }

    public void setProductId(final UUID productId) {
        this.productId = productId;
    }

    public Set<ProductImage> getImageUrls() {
        return imageUrls;
    }

    public void setImageUrls(final Set<ProductImage> imageUrls) {
        this.imageUrls = imageUrls;
    }
}
