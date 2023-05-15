package com.internship.atlantbh.auctionbackend.product;
import com.internship.atlantbh.auctionbackend.user.User;
import com.internship.atlantbh.auctionbackend.image.ProductImage;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.internship.atlantbh.auctionbackend.category.Category;
import com.internship.atlantbh.auctionbackend.productauction.ProductAuction;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.ManyToOne;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.OneToOne;
import javax.persistence.OneToMany;

import java.util.Set;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
@Table(name = "product", schema = "dev")
public class Product {

    @Id
    @GeneratedValue
    private java.util.UUID id;

    @Column(name = "user_id", nullable = false)
    private java.util.UUID userId;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(name = "price", nullable = false)
    private double price;

    @Column(name = "description")
    private String description;

    @Column(name = "size")
    private String size;

    @Column(name = "color")
    private String color;

    @ManyToOne
    @JoinColumn(
            name = "subcategory_id",
            referencedColumnName = "id",
            insertable = false,
            updatable = false
    )
    @ToString.Exclude
    private Category category;

    @ManyToMany(mappedBy = "wishlisted")
    @ToString.Exclude
    @JsonIgnore
    Set<User> wishlistedBy;

    @OneToOne(
            mappedBy = "product"
    )
    @ToString.Exclude
    private ProductAuction productAuction;

    @OneToMany(
            mappedBy = "product"
    )
    @ToString.Exclude
    private Set<ProductImage> productImages;

    public java.util.UUID getId() {
        return id;
    }

    public void setId(final java.util.UUID id) {
        this.id = id;
    }

    public java.util.UUID getUserId() {
        return userId;
    }

    public void setUserId(final java.util.UUID userId) {
        this.userId = userId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(final String productName) {
        this.productName = productName;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(final double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(final String description) {
        this.description = description;
    }

    public String getSize() {
        return size;
    }

    public void setSize(final String size) {
        this.size = size;
    }

    public String getColor() {
        return color;
    }

    public void setColor(final String color) {
        this.color = color;
    }

    public Set<User> getWishlistedBy() {
        return wishlistedBy;
    }

    public void setWishlistedBy(final Set<User> wishlistedBy) {
        this.wishlistedBy = wishlistedBy;
    }

    public ProductAuction getProductAuction() {
        return productAuction;
    }

    public void setProductAuction(final ProductAuction productAuction) {
        this.productAuction = productAuction;
    }

    public Set<ProductImage> getProductImages() {
        return productImages;
    }

    public void setProductImages(final Set<ProductImage> productImages) {
        this.productImages = productImages;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(final Category category) {
        this.category = category;
    }

}
