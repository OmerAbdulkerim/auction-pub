package com.internship.atlantbh.auctionbackend.productauction;

import com.internship.atlantbh.auctionbackend.product.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;
import java.util.UUID;

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class SellerProductInfo {

    private String pictureUrl;
    private String productName;
    private Timestamp endDate;
    private double startPrice;
    private int bidsAmount;
    private double highestBid;
    private UUID productId;

    public SellerProductInfo(final Product product, final int bidsAmount, final double highestBid) {
        this.pictureUrl = !product.getProductImages().isEmpty() ? product.getProductImages().iterator().next().getImageUrl() : "";
        this.productName = product.getProductName();
        this.endDate = product.getProductAuction().getEndDate();
        this.startPrice = product.getPrice();
        this.bidsAmount = bidsAmount;
        this.highestBid = highestBid;
        this.productId = product.getId();
    }

    public String getPictureUrl() {
        return pictureUrl;
    }

    public void setPictureUrl(final String pictureUrl) {
        this.pictureUrl = pictureUrl;
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

    public double getStartPrice() {
        return startPrice;
    }

    public void setStartPrice(final double startPrice) {
        this.startPrice = startPrice;
    }

    public int getBidsAmount() {
        return bidsAmount;
    }

    public void setBidsAmount(final int bidsAmount) {
        this.bidsAmount = bidsAmount;
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
}
