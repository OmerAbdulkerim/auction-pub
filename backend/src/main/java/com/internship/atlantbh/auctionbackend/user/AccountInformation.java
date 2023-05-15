package com.internship.atlantbh.auctionbackend.user;

import com.internship.atlantbh.auctionbackend.address.RedactedAddress;
import com.internship.atlantbh.auctionbackend.card.Card;
import com.internship.atlantbh.auctionbackend.card.RedactedCard;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
public class AccountInformation {

    private RedactedUser redactedUser;
    private RedactedAddress address;
    private RedactedCard card;

    public AccountInformation(final RedactedUser redactedUser, final RedactedAddress address, final RedactedCard card) {
        this.redactedUser = redactedUser;
        this.address = address;
        this.card = card;
    }

    public RedactedUser getRedactedUser() {
        return redactedUser;
    }

    public void setRedactedUser(final User user) {
        this.redactedUser = RedactedUser.builder()
                .firstName(user.getFirstName())
                .lastName(user.getLastName())
                .phone(user.getPhoneNumber())
                .email(user.getEmail())
                .profilePictureUrl(user.getProfilePictureUrl() != null ? user.getProfilePictureUrl() : "")
                .dateOfBirth(user.getDateOfBirth() != null ? user.getDateOfBirth() : "")
                .build();
    }

    public RedactedAddress getAddress() {
        return address;
    }

    public void setAddress(final RedactedAddress address) {
        this.address = address;
    }

    public RedactedCard getCard() {
        return card;
    }

    public void setCard(final Card card) {
        this.card = RedactedCard.builder()
                .name(card.getCardHolder())
                .number(card.getCardNumber())
                .cvv(card.getCvv())
                .month(card.getExpirationMonth())
                .year(card.getExpirationYear())
                .build();;
    }

    @Override
    public String toString() {
        return "AccountInformation{" +
                "redactedUser=" + redactedUser +
                ", address=" + address +
                ", card=" + card +
                '}';
    }
}
