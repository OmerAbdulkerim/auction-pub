package com.internship.atlantbh.auctionbackend.product;

import com.internship.atlantbh.auctionbackend.helpers.QueryOperator;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.util.List;

@Builder
@Getter
@Setter
@ToString
public class ProductFilter {

    private String field;
    private String secondaryField;
    private String value;
    private List<String> values;
    private QueryOperator operator;

}
