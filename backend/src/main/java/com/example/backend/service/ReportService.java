package com.example.backend.service;

import com.example.backend.dto.MakeReport;

public interface ReportService {
    String addPostReport(long postId, MakeReport report);
    String addUserReport(long reportedId, MakeReport report);
}
