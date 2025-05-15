package com.example.backend.controller;

import com.example.backend.dto.admin.AdminPostResponse;
import com.example.backend.dto.admin.AdminUserResponse;
import com.example.backend.dto.admin.UserReportDTO;
import com.example.backend.dto.filter.AdminPostFilter;
import com.example.backend.dto.admin.PostReportDTO;
import com.example.backend.dto.filter.AdminUserFilter;
import com.example.backend.dto.post.PostStats;
import com.example.backend.dto.report.ReportStats;
import com.example.backend.dto.user.UserStats;
import com.example.backend.service.AdminService;
import com.example.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
                .totalUsers(adminService.getTotalUser())
                .totalUsersThisMonth( adminService.getTotalUserThisMonth())
                .totalUsersThisDay( adminService.getTotalUserThisDay())
                .build();
        return ResponseEntity.ok(userStats);
    }

    @GetMapping("/postTable")
    public ResponseEntity<AdminPostResponse> getPostTable(
            @RequestParam(defaultValue = "") String authorName,
            @RequestParam(defaultValue = "") String sortCondition,
            @RequestParam(defaultValue = "") String status,
            @RequestParam(defaultValue = "1") int pageNumber,
            @RequestParam(defaultValue = "5") int pageSize
    ){
        return ResponseEntity.ok(adminService.getPostManageList(AdminPostFilter.builder()
                        .authorName(authorName)
                        .sortCondition(sortCondition)
                        .pageNumber(pageNumber)
                        .pageSize(pageSize)
                        .status(status)
                .build()));
    }

    @GetMapping("/userTable")
    public ResponseEntity<AdminUserResponse> getUserTable(
            @RequestParam(defaultValue = "") String fullName,
            @RequestParam(defaultValue = "") String phoneNumber,
            @RequestParam(defaultValue = "") String email,
            @RequestParam(defaultValue = "") String sortCondition,
            @RequestParam(defaultValue = "") int pageNumber,
            @RequestParam(defaultValue = "") int pageSize)
    {
        return ResponseEntity.ok(adminService.getUserManageList(AdminUserFilter.builder()
                        .fullName(fullName)
                        .phoneNumber(phoneNumber)
                        .sortCondition(sortCondition)
                        .pageNumber(pageNumber)
                        .pageSize(pageSize)
                        .email(email)
                .build()));
    }

    @GetMapping("/postsCount")
    public ResponseEntity<Long> getPostCount(){
        return ResponseEntity.ok(adminService.getTotalPost());
    }

    @GetMapping("/usersCount")
    public ResponseEntity<Long> getUserCount(){
        return ResponseEntity.ok(adminService.getTotalUser());
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<PostReportDTO> getPostReport(@PathVariable long postId){
        return ResponseEntity.ok(adminService.getPostReport(postId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<UserReportDTO> getUserReport(@PathVariable long userId){
        return ResponseEntity.ok(adminService.getUserReport(userId));
    }

    @DeleteMapping("/user/delete/{userId}")
    public ResponseEntity<String> deleteUser(@PathVariable long userId){
        return ResponseEntity.ok(adminService.deleteUser(userId));
    }

    @DeleteMapping("/report/delete/{reportId}")
    public ResponseEntity<String> deleteReport(@PathVariable long reportId){
        return ResponseEntity.ok(adminService.deleteReport(reportId));
    }
}
