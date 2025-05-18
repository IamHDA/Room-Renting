package com.example.backend.exception;

import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.http.InvalidMediaTypeException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.io.IOException;
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

    @ExceptionHandler(InvalidMediaTypeException.class)
    public ResponseEntity<ExceptionDetail> invalidMediaTypeException(InvalidMediaTypeException e){
        ExceptionDetail exceptionDetail = new ExceptionDetail();
        exceptionDetail.setName("invalidMediaTypeException");
        exceptionDetail.setDetail(e.getMessage());
        exceptionDetail.setTime(LocalDateTime.now());
        return new ResponseEntity<>(exceptionDetail, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ExceptionDetail> methodArgumentNotValidException(MethodArgumentNotValidException e){
        ExceptionDetail exceptionDetail = new ExceptionDetail();
        exceptionDetail.setName("methodArgumentNotValidException");
        exceptionDetail.setDetail(e.getMessage());
        exceptionDetail.setTime(LocalDateTime.now());
        return new ResponseEntity<>(exceptionDetail, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<ExceptionDetail> ioException(MaxUploadSizeExceededException e){
        ExceptionDetail exceptionDetail = new ExceptionDetail();
        exceptionDetail.setName("fileTooBigException");
        exceptionDetail.setDetail(e.getMessage());
        exceptionDetail.setTime(LocalDateTime.now());
        return new ResponseEntity<>(exceptionDetail, HttpStatus.BAD_REQUEST);
    }
}
