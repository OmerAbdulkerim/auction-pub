package com.internship.atlantbh.auctionbackend.card;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RedactedCard {

    private String name;
    private String number;
    private Integer cvv;
    private Integer month;
    private Integer year;

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

    public Integer getCvv() {
        return cvv;
    }

    public void setCvv(final Integer cvv) {
        this.cvv = cvv;
    }

    public Integer getMonth() {
        return month;
    }

    public void setMonth(final Integer month) {
        this.month = month;
    }

    public Integer getYear() {
        return year;
    }

    public void setYear(final Integer year) {
        this.year = year;
    }

    @Override
    public String toString() {
        return "RedactedCard{" +
                "name='" + name + '\'' +
                ", number='" + number + '\'' +
                ", cvv=" + cvv +
                ", month=" + month +
                ", year=" + year +
                '}';
    }
}
