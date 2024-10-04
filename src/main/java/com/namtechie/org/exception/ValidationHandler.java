package com.namtechie.org.exception;

import io.jsonwebtoken.ExpiredJwtException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ValidationHandler {

    // Xử lý ngoại lệ MethodArgumentNotValidException (lỗi validation)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidation(MethodArgumentNotValidException exception) {
        StringBuilder message = new StringBuilder();

        // Lấy thông báo lỗi từ exception và xây dựng chuỗi thông báo
        for (FieldError fieldError : exception.getBindingResult().getFieldErrors()) {
            message.append(fieldError.getField()).append(": ").append(fieldError.getDefaultMessage()).append(". ");
        }
        return new ResponseEntity<>(message.toString(), HttpStatus.BAD_REQUEST);
    }

    // Xử lý ngoại lệ EntityNotFoundException (lỗi không tìm thấy)
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFound(EntityNotFoundException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
    }

    // Xử lý ngoại lệ DuplicateEntity (lỗi trùng lặp)
    @ExceptionHandler(DuplicateEntity.class)
    public ResponseEntity<String> handleDuplicateEntity(DuplicateEntity exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.CONFLICT);
    }

    // Xử lý ngoại lệ IllegalArgumentException (lỗi đối số không hợp lệ)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleIllegalArgumentException(RuntimeException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(IllegalAccessException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalAccessException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
    }

    // Xử lý ngoại lệ ExpiredJwtException (lỗi JWT hết hạn)
    @ExceptionHandler(io.jsonwebtoken.ExpiredJwtException.class)
    public ResponseEntity<String> handleExpiredJwtException(ExpiredJwtException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.UNAUTHORIZED);
    }

}