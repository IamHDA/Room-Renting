package com.example.backend.dto.admin;

import com.example.backend.dto.AccountDTO;
import com.example.backend.dto.report.ReportDTO;
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
