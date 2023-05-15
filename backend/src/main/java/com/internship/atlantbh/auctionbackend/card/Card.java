package com.internship.atlantbh.auctionbackend.card;

import com.internship.atlantbh.auctionbackend.user.User;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.ToString;

import javax.persistence.Entity;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Id;
import javax.persistence.GeneratedValue;
import javax.persistence.Column;
import java.util.Set;
import java.util.UUID;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
@Entity
@Table(name = "card", schema = "dev")
public class Card {

    @Id
    @GeneratedValue
    private UUID id;

    @Column(name = "card_holder", nullable = false)
    private String cardHolder;

    @Column(name = "card_number", unique = true, nullable = false)
    private String cardNumber;

    @Column(name = "cvv", nullable = false)
    private int cvv;

    @Column(name = "expiration_month", nullable = false)
    private int expirationMonth;

    @Column(name = "expiration_year", nullable = false)
    private int expirationYear;

    @OneToMany(mappedBy = "card")
    @ToString.Exclude
    private Set<User> users;

    public UUID getId() {
        return id;
    }

    public void setId(final UUID id) {
        this.id = id;
    }

    public String getCardHolder() {
        return cardHolder;
    }

    public void setCardHolder(final String cardHolder) {
        this.cardHolder = cardHolder;
    }

    public String getCardNumber() {
        return cardNumber;
    }

    public void setCardNumber(final String cardNumber) {
        this.cardNumber = cardNumber;
    }

    public int getCvv() {
        return cvv;
    }

    public void setCvv(final int cvv) {
        this.cvv = cvv;
    }

    public int getExpirationMonth() {
        return expirationMonth;
    }

    public void setExpirationMonth(final int expirationMonth) {
        this.expirationMonth = expirationMonth;
    }

    public int getExpirationYear() {
        return expirationYear;
    }

    public void setExpirationYear(final int expirationYear) {
        this.expirationYear = expirationYear;
    }

    public Set<User> getUsers() {
        return users;
    }

    public void setUsers(final Set<User> users) {
        this.users = users;
    }
}
