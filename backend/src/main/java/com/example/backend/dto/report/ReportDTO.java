package com.example.backend.dto.report;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class ReportDTO {
    private long id;
    private String name;
    private String description;
    @JsonFormat(pattern = "HH:mm, dd/MM/yyyy")
    private LocalDateTime createdAt;
    private ReportCreator reportCreator;
}
