package com.esm.exceptions;

public class RequestAlreadyExistsAndNotDeclinedException extends RuntimeException {

    public RequestAlreadyExistsAndNotDeclinedException(String message) {
        super(message);
    }

    public RequestAlreadyExistsAndNotDeclinedException(String message, Throwable cause) {
        super(message, cause);
    }
}