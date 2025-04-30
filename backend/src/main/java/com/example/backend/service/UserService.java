package com.example.backend.service;

import com.example.backend.dto.user.UserHeader;
import com.example.backend.dto.user.UserPersonalInformation;
import com.example.backend.dto.user.UserProfile;
import com.example.backend.entity.mySQL.User;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

public interface UserService {
    User getCurrentUser();
    UserProfile getProfile(long userId);
    UserPersonalInformation getPersonalInformation();
    UserHeader getUserHeader(long userId);
    String changeAvatar(MultipartFile file) throws IOException;
    String changeBackgroundImage(MultipartFile file) throws IOException;
    String changePersonalInformation(UserPersonalInformation information);
    String changePassword(String oldPassword, String newPassword);

    void addDefaultProfileImage(User user);
}
