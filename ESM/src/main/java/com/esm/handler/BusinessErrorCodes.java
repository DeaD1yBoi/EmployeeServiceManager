package com.esm.handler;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

import static org.springframework.http.HttpStatus.FORBIDDEN;
import static org.springframework.http.HttpStatus.NOT_IMPLEMENTED;

@AllArgsConstructor
public enum BusinessErrorCodes {
    NO_CODE(0, NOT_IMPLEMENTED, "No code"),
    ACCOUNT_LOCKED(302, FORBIDDEN, "User account is locked"),
    ACCOUNT_DISABLED(303, FORBIDDEN, "User account is disabled"),
    BAD_CREDENTIALS(304, FORBIDDEN, "Login and / or password is incorrect"),
    USERNAME_ALREADY_EXISTS(409, FORBIDDEN, "User with provided username already exists"),
    EMPLOYEE_NOT_FOUND(404,FORBIDDEN, "Employee not found"),
    SERVICE_NOT_FOUND(404, FORBIDDEN, "Service not found"),
    REQUEST_NOT_FOUND(404, FORBIDDEN, "Request not found"),
    USER_ALREADY_HAS_ROLE(400, FORBIDDEN, "User already has this role"),
    REQUEST_ALREADY_EXISTS_AND_NOT_DECLINED(400, FORBIDDEN, "Request already exists in table and has not been declined"),
    UNAUTHORIZED_ERRCODE(401, FORBIDDEN, "Request is unauthorized to access this function / table"),
    USER_NOT_FOUND(404, FORBIDDEN, "User not found"),
    DEPARTMENT_NOT_FOUND(404, FORBIDDEN, "Department not found"),
    POSITION_NOT_FOUND(404, FORBIDDEN, "Position not found"),
    SERVICE_ALREADY_EXISTS(400, FORBIDDEN, "Service already exists")
    ;
    @Getter
    private final int code;
    @Getter
    private final HttpStatus httpStatus;
    @Getter
    private final String description;


}
