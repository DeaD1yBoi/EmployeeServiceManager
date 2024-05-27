package com.esm.exceptions;

public class UserAlreadyHasThisRoleException extends RuntimeException {

    public UserAlreadyHasThisRoleException(String message) {
        super(message);
    }

    public UserAlreadyHasThisRoleException(String message, Throwable cause) {
        super(message, cause);
    }
}