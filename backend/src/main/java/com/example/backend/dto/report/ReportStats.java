package com.example.backend.dto.report;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ReportStats {
    private long totalReports;
    private long totalReportsThisMonth;
    private long totalReportsThisDay;
}
