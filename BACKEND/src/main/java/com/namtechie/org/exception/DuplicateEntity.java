package com.namtechie.org.exception;

public class DuplicateEntity extends RuntimeException {
    public DuplicateEntity(String message) {
        super(message);
    }
}
