package com.example.backend.dto.report;

import lombok.Builder;

@Builder
public class ReportStats {
    private long totalReports;
    private long totalReportsThisMonth;
    private long totalReportsThisDay;
}
