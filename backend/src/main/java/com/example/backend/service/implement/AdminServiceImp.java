package com.example.backend.service.implement;

import com.example.backend.dto.*;
import com.example.backend.dto.filter.AdminPostFilter;
import com.example.backend.dto.post.AdminPostDTO;
import com.example.backend.dto.post.PostDTO;
import com.example.backend.dto.report.ReportCreator;
import com.example.backend.dto.report.ReportDTO;
import com.example.backend.repository.mySQL.*;
import com.example.backend.service.AdminService;
import com.example.backend.utils.FormatUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdminServiceImp implements AdminService {
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private PostRepository postRepo;
    @Autowired
    private PostReportRepository postReportRepo;
    @Autowired
    private ReportRepository reportRepo;
    @Autowired
    private FormatUtil formatUtil;
    @Autowired
    private FilterRepository filterRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public long getTotalUser() {
        return userRepo.count();
    }

    @Override
    public long getTotalUserThisMonth(){
        return userRepo.countByThisMonth(LocalDateTime.now().getMonthValue());
    }

    @Override
    public long getTotalUserThisDay(){
        return userRepo.countByThisDay(LocalDateTime.now().getDayOfMonth());
    }

    @Override
    public List<UserPostReportDTO> getPostManageList(AdminPostFilter filter) {
        return filterRepo.adminFilterPost(filter)
                .stream()
                .map(post -> {
                    UserPostReportDTO dto = modelMapper.map(post, UserPostReportDTO.class);
                    dto.setUserId(post.getUser().getId());
                    dto.setAuthorName(post.getUser().getFullName());
                    dto.setReportedTime(postReportRepo.countByPost(post));
                    return dto;
                })
                .toList();
    }

    @Override
    public PostReportDTO getPostReport(long postId) {
        PostDTO post = formatUtil.convertPostToPostDTO(postId);
        AdminPostDTO adminPostDTO = modelMapper.map(post, AdminPostDTO.class);
        List<ReportDTO> postReports = postReportRepo.findByPostId(postId)
                .stream()
                .map(report -> {
                    ReportDTO dto = modelMapper.map(report.getReport(), ReportDTO.class);
                    dto.setReportCreator(modelMapper.map(report.getReport().getReporter(), ReportCreator.class));
                    return dto;
                })
                .toList();
        return PostReportDTO.builder()
                .post(adminPostDTO)
                .reportList(postReports)
                .build();
    }

    @Override
    public long getTotalPost() {
        return postRepo.count();
    }

    @Override
    public long getTotalPostThisMonth() {
        return postRepo.countByThisMonth(LocalDateTime.now().getMonthValue());
    }

    @Override
    public long getTotalPostThisDay() {
        return postRepo.countByThisDay(LocalDateTime.now().getDayOfMonth());
    }


    @Override
    public long getTotalReport() {
        return reportRepo.count();
    }

    @Override
    public long getTotalReportThisMonth() {
        return reportRepo.countByThisMonth(LocalDateTime.now().getMonthValue());
    }

    @Override
    public long getTotalReportThisDay() {
        return reportRepo.countByThisDay(LocalDateTime.now().getDayOfMonth());
    }
}
