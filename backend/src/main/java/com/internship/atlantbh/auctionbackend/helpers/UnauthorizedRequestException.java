package com.internship.atlantbh.auctionbackend.helpers;

import java.io.Serial;

public class UnauthorizedRequestException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 9107886920585157570L;

    public UnauthorizedRequestException(String message) {
        super(message);
    }
}
