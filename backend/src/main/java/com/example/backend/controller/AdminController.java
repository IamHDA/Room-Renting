package com.example.backend.controller;

import com.example.backend.dto.post.AdminPostRow;
import com.example.backend.dto.user.AdminUserRow;
import com.example.backend.dto.UserReportDTO;
import com.example.backend.dto.filter.AdminPostFilter;
import com.example.backend.dto.PostReportDTO;
import com.example.backend.dto.filter.AdminUserFilter;
import com.example.backend.dto.post.PostStats;
import com.example.backend.dto.report.ReportStats;
import com.example.backend.dto.user.UserStats;
import com.example.backend.service.AdminService;
import com.example.backend.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {
    @Autowired
    private AdminService adminService;
    @Autowired
    private PostService postService;

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

    @GetMapping("/postTable")
    public ResponseEntity<List<AdminPostRow>> getPostTable(@RequestParam String authorName, String sortCondition){
        return ResponseEntity.ok(adminService.getPostManageList(AdminPostFilter.builder()
                .authorName(authorName)
                .sortCondition(sortCondition)
                .build()));
    }

    @GetMapping("/userTable")
    public ResponseEntity<List<AdminUserRow>> getUserTable(@RequestParam String fullName, @RequestParam String phoneNumber, @RequestParam String sortCondition){
        return ResponseEntity.ok(adminService.getUserManageList(AdminUserFilter.builder()
                .fullName(fullName)
                .phoneNumber(phoneNumber)
                .sortCondition(sortCondition)
                .build()));
    }

    @GetMapping("/post/{postId}")
    public ResponseEntity<PostReportDTO> getPostReport(@PathVariable long postId){
        return ResponseEntity.ok(adminService.getPostReport(postId));
    }

    @GetMapping("/user/{userId}")
    public ResponseEntity<UserReportDTO> getUserReport(@PathVariable long userId){
        return ResponseEntity.ok(adminService.getUserReport(userId));
    }

    @DeleteMapping("/post/delete/{postId}")
    public ResponseEntity<String> deletePost(@PathVariable long postId){
        return ResponseEntity.ok(postService.deletePost(postId));
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
