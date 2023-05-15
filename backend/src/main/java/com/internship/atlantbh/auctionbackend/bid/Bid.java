package com.internship.atlantbh.auctionbackend.bid;

import com.internship.atlantbh.auctionbackend.product.Product;
import com.internship.atlantbh.auctionbackend.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Generated;
import org.hibernate.annotations.GenerationTime;

import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
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
@Table(name = "bid", schema = "dev")
public class Bid {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "price")
    private double price;

    @ManyToOne
    @JoinColumn(
            name = "product_id",
            nullable = false
    )
    @ToString.Exclude
    private Product product;

    @ManyToOne
    @JoinColumn(
            name = "user_id",
            nullable = false
    )
    @ToString.Exclude
    private User user;

    @Column(name = "created_timestamp", nullable = false) @Generated(GenerationTime.INSERT)
    private Timestamp createdTimestamp;

    public UUID getId() {
        return id;
    }

    public void setId(final UUID id) {
        this.id = id;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(final double price) {
        this.price = price;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(final Product product) {
        this.product = product;
    }

    public User getUser() {
        return user;
    }

    public void setUser(final User user) {
        this.user = user;
    }

    public Timestamp getCreatedTimestamp() {
        return createdTimestamp;
    }

    public void setCreatedTimestamp(final Timestamp createdTimestamp) {
        this.createdTimestamp = createdTimestamp;
    }
}
