package com.example.backend.dto;

import com.example.backend.dto.report.ReportDTO;
import com.example.backend.dto.user.AdminUserDTO;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class UserReportDTO {
    private AdminUserDTO user;
    private List<AccountDTO> accounts;
    private List<ReportDTO> reportList;
}
