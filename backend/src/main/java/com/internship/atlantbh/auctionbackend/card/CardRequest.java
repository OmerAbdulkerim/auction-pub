package com.internship.atlantbh.auctionbackend.card;

public class CardRequest {

    private String name;
    private String number;
    private String cvv;
    private String month;
    private String year;

    public CardRequest(final String name, final String number, final String cvv, final String month, final String year) {
        this.name = name;
        this.number = number;
        this.cvv = cvv;
        this.month = month;
        this.year = year;
    }

    public String getName() {
        return name;
    }

    public void setName(final String name) {
        this.name = name;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(final String number) {
        this.number = number;
    }

    public String getCvv() {
        return cvv;
    }

    public void setCvv(final String cvv) {
        this.cvv = cvv;
    }

    public String getMonth() {
        return month;
    }

    public void setMonth(final String month) {
        this.month = month;
    }

    public String getYear() {
        return year;
    }

    public void setYear(final String year) {
        this.year = year;
    }
}
