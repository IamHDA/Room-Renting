package com.example.backend.service;

import com.example.backend.dto.admin.AdminPostResponse;
import com.example.backend.dto.admin.AdminUserResponse;
import com.example.backend.dto.admin.UserReportDTO;
import com.example.backend.dto.filter.AdminPostFilter;
import com.example.backend.dto.admin.PostReportDTO;
import com.example.backend.dto.filter.AdminUserFilter;

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
    AdminPostResponse getPostManageList(AdminPostFilter filter);
    AdminUserResponse getUserManageList(AdminUserFilter filter);
    PostReportDTO getPostReport(long postId);
    UserReportDTO getUserReport(long userId);
    String deleteReport(long reportId);
    String deleteUser(long userId);
}
