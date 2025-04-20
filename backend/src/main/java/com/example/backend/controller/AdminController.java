package com.example.backend.controller;

import com.example.backend.dto.UserPostReportDTO;
import com.example.backend.dto.filter.AdminPostFilter;
import com.example.backend.dto.PostReportDTO;
import com.example.backend.dto.post.PostStats;
import com.example.backend.dto.report.ReportStats;
import com.example.backend.dto.user.UserStats;
import com.example.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;

    @GetMapping("/totalPosts")
    public ResponseEntity<PostStats> getTotalPosts(){
        PostStats postStats = PostStats.builder()
                .totalPosts(adminService.getTotalPost())
                .totalPostsThisMonth(adminService.getTotalPostThisMonth())
                .totalPostsThisDay(adminService.getTotalPostThisDay())
                .build();
        return ResponseEntity.ok(postStats);
    }

    @GetMapping("/totalReports")
    public ResponseEntity<ReportStats> getTotalReports(){
        ReportStats reportStats = ReportStats.builder()
                .totalReports(adminService.getTotalReport())
                .totalReportsThisMonth(adminService.getTotalReportThisMonth())
                .totalReportsThisDay(adminService.getTotalReportThisDay())
                .build();
        return ResponseEntity.ok(reportStats);
    }

    @GetMapping("/totalUsers")
    public ResponseEntity<UserStats> getTotalUsers(){
        UserStats userStats = UserStats
                .builder()
                .totalUser(adminService.getTotalUser())
                .totalUserThisMonth( adminService.getTotalUserThisMonth())
                .totalUserThisDay( adminService.getTotalUserThisDay())
                .build();
        return ResponseEntity.ok(userStats);
    }

    @GetMapping("/postsTable")
    public ResponseEntity<List<UserPostReportDTO>> getPostTable(@RequestParam String authorName, String sortCondition){
        return ResponseEntity.ok(adminService.getPostManageList(AdminPostFilter.builder()
                .authorName(authorName)
                .sortCondition(sortCondition)
                .build()));
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<PostReportDTO> getPostReport(@PathVariable long postId){
        return ResponseEntity.ok(adminService.getPostReport(postId));
    }
}
