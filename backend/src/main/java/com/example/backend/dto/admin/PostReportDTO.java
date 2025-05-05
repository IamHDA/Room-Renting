package com.example.backend.dto.admin;

import com.example.backend.dto.report.ReportDTO;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class PostReportDTO{
    private AdminPostDTO post;
    private List<ReportDTO> reportList;
}
