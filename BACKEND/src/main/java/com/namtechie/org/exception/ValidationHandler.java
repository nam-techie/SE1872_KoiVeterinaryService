package com.namtechie.org.exception;

import com.namtechie.org.model.response.ErrorResponse;
import io.jsonwebtoken.ExpiredJwtException;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.List;

@RestControllerAdvice
public class ValidationHandler {

    // Xử lý ngoại lệ MethodArgumentNotValidException (lỗi validation)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<String> handleValidation(MethodArgumentNotValidException exception) {
        StringBuilder message = new StringBuilder("Lỗi xác thực: ");

        // Lấy thông báo lỗi từ exception và xây dựng chuỗi thông báo
        for (FieldError fieldError : exception.getBindingResult().getFieldErrors()) {
            message.append(fieldError.getDefaultMessage()).append(". ");
        }
        return new ResponseEntity<>(message.toString(), HttpStatus.BAD_REQUEST);
    }

    // Xử lý ngoại lệ EntityNotFoundException (lỗi không tìm thấy)
    @ExceptionHandler(EntityNotFoundException.class)
    public ResponseEntity<String> handleEntityNotFound(EntityNotFoundException exception) {
        return new ResponseEntity<>("Không tìm thấy tài nguyên: " + exception.getMessage(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(DuplicateEntity.class)
    public ResponseEntity<ErrorResponse> handleDuplicateEntity(DuplicateEntity exception) {
        ErrorResponse errorResponse = new ErrorResponse(HttpStatus.CONFLICT.value(),
                "Lỗi ", List.of(exception.getMessage()));
        return new ResponseEntity<>(errorResponse, HttpStatus.CONFLICT);
    }




    // Xử lý ngoại lệ IllegalArgumentException (lỗi đối số không hợp lệ)
    @ExceptionHandler(IllegalArgumentException.class)
    public ResponseEntity<String> handleIllegalArgumentException(IllegalArgumentException exception) {
        return new ResponseEntity<>("Đối số không hợp lệ: " + exception.getMessage(), HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(RuntimeException.class)
    public ResponseEntity<String> handleRuntimeException(RuntimeException exception) {
        return new ResponseEntity<>("Lỗi hệ thống: " + exception.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(IllegalAccessException.class)
    public ResponseEntity<String> handleIllegalAccessException(IllegalAccessException exception) {
        return new ResponseEntity<>("Truy cập trái phép: " + exception.getMessage(), HttpStatus.FORBIDDEN);
    }

    // Xử lý ngoại lệ ExpiredJwtException (lỗi JWT hết hạn)
    @ExceptionHandler(ExpiredJwtException.class)
    public ResponseEntity<String> handleExpiredJwtException(ExpiredJwtException exception) {
        return new ResponseEntity<>("Token đã hết hạn, vui lòng đăng nhập lại.", HttpStatus.UNAUTHORIZED);
    }

    @ExceptionHandler(DoctorNotAvailableException.class)
    public ResponseEntity<String> handleDoctorNotAvailableException(DoctorNotAvailableException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.NOT_FOUND);
    }
}


