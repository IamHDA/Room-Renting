package com.example.backend.controller;

import com.example.backend.dto.MakeReport;
import com.example.backend.service.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/report")
public class ReportController {

    @Autowired
    private ReportService reportService;

    @PostMapping("/reportUser/{userId}")
    public ResponseEntity<String> reportUser(@PathVariable long userId, @RequestBody MakeReport report){
        return ResponseEntity.ok(reportService.addUserReport(userId, report));
    }

    @PostMapping("/reportPost/{postId}")
    public ResponseEntity<String> reportPost(@PathVariable long postId, @RequestBody MakeReport report){
        return ResponseEntity.ok(reportService.addPostReport(postId, report));
    }
}
