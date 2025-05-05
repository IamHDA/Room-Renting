package com.example.backend.service.implement;

import com.example.backend.Enum.UserStatus;
import com.example.backend.dto.*;
import com.example.backend.dto.admin.*;
import com.example.backend.dto.filter.AdminPostFilter;
import com.example.backend.dto.filter.AdminUserFilter;
import com.example.backend.dto.post.PostDTO;
import com.example.backend.dto.report.ReportCreator;
import com.example.backend.dto.report.ReportDTO;
import com.example.backend.dto.admin.AdminUserDTO;
import com.example.backend.dto.admin.AdminUserRow;
import com.example.backend.entity.mySQL.User;
import com.example.backend.repository.mySQL.*;
import com.example.backend.service.AddressService;
import com.example.backend.service.AdminService;
import com.example.backend.utils.Util;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AdminServiceImp implements AdminService {
    @Autowired
    private AccountRepository accountRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private PostRepository postRepo;
    @Autowired
    private PostReportRepository postReportRepo;
    @Autowired
    private UserReportRepository userReportRepo;
    @Autowired
    private ReportRepository reportRepo;
    @Autowired
    private Util util;
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
    public AdminPostResponse getPostManageList(AdminPostFilter filter) {
        AdminPostResponse res = new AdminPostResponse();
        res.setPosts(filterRepo.adminFilterPost(filter)
                        .stream()
                        .map(post -> {
                            AdminPostRow dto = modelMapper.map(post, AdminPostRow.class);
                            dto.setUserId(post.getUser().getId());
                            dto.setAuthorName(post.getUser().getFullName());
                            dto.setReportedTime(postReportRepo.countByPost(post));
                            return dto;
                        })
                    .toList());
        res.setTotalLength(filterRepo.countAdminPost(filter));
        return res;
    }

    @Override
    public AdminUserResponse getUserManageList(AdminUserFilter filter) {
        AdminUserResponse res = new AdminUserResponse();
        res.setUsers(filterRepo.adminFilterUser(filter)
                    .stream()
                    .map(user -> {
                        AdminUserRow dto = modelMapper.map(user, AdminUserRow.class);
                        dto.setReportedTime(userReportRepo.countByUser(user));
                        return dto;
                    })
                .toList());
        res.setTotalUsers(filterRepo.countAdminUser(filter));
        return res;
    }

    @Override
    public PostReportDTO getPostReport(long postId) {
        PostDTO post = util.convertPostToPostDTO(postId);
        AdminPostDTO adminPostDTO = modelMapper.map(post, AdminPostDTO.class);
        List<ReportDTO> reports = postReportRepo.findByPost_Id(postId)
                .stream()
                .map(postReport -> {
                    ReportDTO dto = modelMapper.map(postReport.getReport(), ReportDTO.class);
                    dto.setReportCreator(modelMapper.map(postReport.getReport().getReporter(), ReportCreator.class));
                    return dto;
                })
                .toList();
        return PostReportDTO.builder()
                .post(adminPostDTO)
                .reportList(reports)
                .build();
    }

    @Override
    public UserReportDTO getUserReport(long userId) {
        User user = userRepo.findById(userId);
        AdminUserDTO userDTO = modelMapper.map(userRepo.findById(userId), AdminUserDTO.class);
        userDTO.setStatus(user.getStatus().getDisplayName());
        System.out.println("Message Reply" + util.getMessageReplyPercentage(user.getId()));
        userDTO.setReplyPercentage(util.getMessageReplyPercentage(user.getId()));
        userDTO.setAddressDTO(util.getTextAddress(user.getAddress()));
        List<AccountDTO> accounts = accountRepo.findByUser(user)
                .stream()
                .map(account -> modelMapper.map(account, AccountDTO.class))
                .toList();
        List<ReportDTO> reports = userReportRepo.findByUser(user)
                .stream()
                .map(userReport -> {
                    ReportDTO dto = modelMapper.map(userReport.getReport(), ReportDTO.class);
                    dto.setReportCreator(modelMapper.map(userReport.getReport().getReporter(), ReportCreator.class));
                    return dto;
                })
                .toList();
        return UserReportDTO.builder()
                    .user(userDTO)
                    .accounts(accounts)
                    .reportList(reports)
                .build();
    }

    @Override
    public String deleteReport(long reportId) {
        reportRepo.deleteById(reportId);
        return "Report deleted successfully!";
    }

    @Override
    public String deleteUser(long userId) {
        userRepo.deleteById(userId);
        return "User deleted successfully!";
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
