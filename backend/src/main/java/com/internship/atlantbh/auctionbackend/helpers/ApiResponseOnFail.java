package com.internship.atlantbh.auctionbackend.helpers;

public class ApiResponseOnFail {

    private String message;
    private int code;
    private String reason;

    public ApiResponseOnFail(final String message, final int code, final String reason) {
        this.message = message;
        this.code = code;
        this.reason = reason;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(final String message) {
        this.message = message;
    }

    public int getCode() {
        return code;
    }

    public void setCode(final int code) {
        this.code = code;
    }

    public String getReason() {
        return reason;
    }

    public void setReason(final String reason) {
        this.reason = reason;
    }
}
