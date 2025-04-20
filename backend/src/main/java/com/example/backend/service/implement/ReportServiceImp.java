package com.example.backend.service.implement;

import com.example.backend.dto.report.MakeReport;
import com.example.backend.entity.mySQL.*;
import com.example.backend.repository.mySQL.*;
import com.example.backend.service.ReportService;
import com.example.backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class ReportServiceImp implements ReportService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private PostRepository postRepo;
    @Autowired
    private PostReportRepository postReportRepo;
    @Autowired
    private UserReportRepository userReportRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ReportRepository reportRepo;
    @Autowired
    private UserService userService;

    @Override
    public String addPostReport(long postId, MakeReport report) {
        Post post = postRepo.findById(postId).orElse(null);
        User reporter = userService.getCurrentUser();
        if(postReportRepo.findSamePostReport(post, report.getName(), reporter).isPresent()){
            return "You have already reported this post with the same reason!";
        }
        Report newReport = addReport(report, reporter);
        postReportRepo.save(new PostReport(post, newReport));
        return "Post reported successfully!";
    }

    @Override
    public String addUserReport(long reportedId, MakeReport report) {
        User reported = userRepo.findById(reportedId).orElse(null);
        User reporter = userService.getCurrentUser();
        if(userReportRepo.findSameUserReport(reported, report.getName(), reporter).isPresent()){
            return "You have already reported this user with the same reason!";
        }
        Report newReport = addReport(report, reporter);
        userReportRepo.save(new UserReport(reported, newReport));
        return "User reported successfully!";
    }

    public Report addReport(MakeReport report, User reporter){
        Report newReport = modelMapper.map(report, Report.class);
        newReport.setReporter(reporter);
        newReport.setCreatedAt(LocalDateTime.now());
        return reportRepo.save(newReport);
    }
}
