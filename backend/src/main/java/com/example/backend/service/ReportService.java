package com.example.backend.service;

import com.example.backend.dto.report.MakeReport;

public interface ReportService {
    String addPostReport(long postId, MakeReport report);
    String addUserReport(long reportedId, MakeReport report);
}
