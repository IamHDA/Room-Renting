package com.example.backend.exception;

import io.jsonwebtoken.ExpiredJwtException;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.time.LocalDateTime;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(DataIntegrityViolationException.class)
    public ResponseEntity<ExceptionDetail> integrityException(DataIntegrityViolationException e){
        ExceptionDetail exceptionDetail = new ExceptionDetail();
        exceptionDetail.setName("dataIntegrityViolationException");
        exceptionDetail.setDetail(e.getMessage());
        exceptionDetail.setTime(LocalDateTime.now());
        return new ResponseEntity<>(exceptionDetail, HttpStatus.BAD_REQUEST);
    }
}
