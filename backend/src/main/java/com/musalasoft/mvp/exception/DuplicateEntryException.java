package com.musalasoft.mvp.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.BAD_REQUEST)
public class DuplicateEntryException extends RuntimeException {
    public DuplicateEntryException() {
        super();
    }

    public DuplicateEntryException(String message, Throwable cause) {
        super(message, cause);
    }

    public DuplicateEntryException(String message) {
        super(message);
    }

    public DuplicateEntryException(Throwable cause) {
        super(cause);
    }
}
