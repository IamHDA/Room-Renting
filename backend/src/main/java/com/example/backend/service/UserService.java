package com.example.backend.service;

import com.example.backend.dto.UserPersonalInformation;
import com.example.backend.dto.UserProfile;
import com.example.backend.entity.mySQL.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

public interface UserService {
    User getCurrentUser();
    UserProfile getProfile(long userId);
    UserPersonalInformation getPersonalInformation();
    String changeAvatar(MultipartFile file) throws IOException;
    String changeBackgroundImage(MultipartFile file) throws IOException;
    String changePersonalInformation(UserPersonalInformation information);
    String changePassword(String oldPassword, String newPassword);
}
