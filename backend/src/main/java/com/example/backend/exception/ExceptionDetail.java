package com.example.backend.exception;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ExceptionDetail {
    private String name;
    private String detail;
    @JsonFormat(pattern = "dd-MM-yy HH:mm:ss.SS")
    private LocalDateTime time;
}
