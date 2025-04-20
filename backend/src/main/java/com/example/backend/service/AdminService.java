package com.example.backend.service;

import com.example.backend.dto.UserPostReportDTO;
import com.example.backend.dto.filter.AdminPostFilter;
import com.example.backend.dto.PostReportDTO;

import java.util.List;

public interface AdminService {
    long getTotalUser();
    long getTotalUserThisMonth();
    long getTotalUserThisDay();
    long getTotalPost();
    long getTotalPostThisMonth();
    long getTotalPostThisDay();
    long getTotalReport();
    long getTotalReportThisMonth();
    long getTotalReportThisDay();
    List<UserPostReportDTO> getPostManageList(AdminPostFilter filter);
    PostReportDTO getPostReport(long postId);
}
