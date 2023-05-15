package com.internship.atlantbh.auctionbackend.helpers;

import java.io.Serial;

public class FormValidationRequestException extends RuntimeException {

    @Serial
    private static final long serialVersionUID = 3292695409482096804L;
    private final String VALIDATION_REQUEST_EXCEPTION_DETAILS_BASE = "Form validation failed. This happened because the %s input does not match it's intended regex pattern or is not directly corresponding to the saved user credentials.";
    private String exceptionType;
    private String fieldName;
    private String message;

    public FormValidationRequestException(final String exceptionType, final String fieldName) {
        this.exceptionType = exceptionType;
        this.message = String.format(VALIDATION_REQUEST_EXCEPTION_DETAILS_BASE, fieldName);
        this.fieldName = fieldName;
    }

    public String getExceptionType() {
        return exceptionType;
    }

    public void setExceptionType(final String exceptionType) {
        this.exceptionType = exceptionType;
    }

    public String getFieldName() {
        return fieldName;
    }

    public void setFieldName(final String fieldName) {
        this.fieldName = fieldName;
    }

    @Override
    public String getMessage() {
        return message;
    }

    public void setMessage(final String fieldName) {
        this.message = String.format(VALIDATION_REQUEST_EXCEPTION_DETAILS_BASE, fieldName);
    }
}
