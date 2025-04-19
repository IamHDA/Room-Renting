package com.example.backend.service;

import com.example.backend.dto.report.MakeReport;

public interface ReportService {
    long getTotalReport();
    long getTotalReportThisMonth();
    long getTotalReportThisDay();
    String addPostReport(long postId, MakeReport report);
    String addUserReport(long reportedId, MakeReport report);
}
