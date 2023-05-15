package com.internship.atlantbh.auctionbackend.order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Column;
import java.sql.Timestamp;
import java.util.UUID;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "order", schema = "dev")
public class Order {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "product_id", nullable = false)
    private UUID productId;

    @Column(name = "user_id", nullable = false)
    private UUID userId;

    @Column(name = "order_address_id", nullable = false)
    private UUID orderAddressId;

    @Column(name = "order_email")
    private String orderEmail;

    @Column(name = "order_status", nullable = false)
    private String orderStatus;

    @Column(name = "order_timestamp", nullable = false)
    private Timestamp orderTimestamp;

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

    public UUID getOrderAddressId() {
        return orderAddressId;
    }

    public void setOrderAddressId(final UUID orderAddressId) {
        this.orderAddressId = orderAddressId;
    }

    public String getOrderEmail() {
        return orderEmail;
    }

    public void setOrderEmail(final String orderEmail) {
        this.orderEmail = orderEmail;
    }

    public String getOrderStatus() {
        return orderStatus;
    }

    public void setOrderStatus(final String orderStatus) {
        this.orderStatus = orderStatus;
    }

    public Timestamp getOrderTimestamp() {
        return orderTimestamp;
    }

    public void setOrderTimestamp(final Timestamp orderTimestamp) {
        this.orderTimestamp = orderTimestamp;
    }
}
