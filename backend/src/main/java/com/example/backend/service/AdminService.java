package com.example.backend.service;

import com.example.backend.dto.AdminPostRow;
import com.example.backend.dto.AdminUserRow;
import com.example.backend.dto.UserReportDTO;
import com.example.backend.dto.filter.AdminPostFilter;
import com.example.backend.dto.PostReportDTO;
import com.example.backend.dto.filter.AdminUserFilter;

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
    List<AdminPostRow> getPostManageList(AdminPostFilter filter);
    List<AdminUserRow> getUserManageList(AdminUserFilter filter);
    PostReportDTO getPostReport(long postId);
    UserReportDTO getUserReport(long userId);
    String deleteReport(long reportId);
    String deleteUser(long userId);
}
