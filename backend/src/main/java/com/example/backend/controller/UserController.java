package com.example.backend.controller;

import com.example.backend.dto.user.UserHeader;
import com.example.backend.dto.user.UserPersonalInformation;
import com.example.backend.dto.user.UserProfile;
import com.example.backend.dto.user.UserStats;
import com.example.backend.service.AuthenticationService;
import com.example.backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/user")
public class UserController {
    @Autowired
    private UserService userService;
    @Autowired
    private ModelMapper modelMapper;

    @GetMapping("/currentUser")
    public ResponseEntity<UserHeader> getCurrentUser(){
        UserHeader currentUser = modelMapper.map(userService.getCurrentUser(), UserHeader.class);
        return ResponseEntity.ok(currentUser);
    }

    @GetMapping("/profile/{id}")
    public ResponseEntity<UserProfile> getUserProfile(@PathVariable long id){
        return ResponseEntity.ok(userService.getProfile(id));
    }

    @GetMapping("/personalInformation")
    public ResponseEntity<UserPersonalInformation> getUserPersonalInformation(){
        return ResponseEntity.ok(userService.getPersonalInformation());
    }

    @GetMapping("/email/{userId}")
    public ResponseEntity<String> getUserEmail(@PathVariable long userId){
        return ResponseEntity.ok(userService.getUserEmail(userId));
    }

    @GetMapping("/phoneNumber/{userId}")
    public ResponseEntity<String> getUserPhoneNumber(@PathVariable long userId){
        return ResponseEntity.ok(userService.getUserPhoneNumber(userId));
    }

    @PutMapping("/changeAvatar")
    public ResponseEntity<String> changeAvatar(@RequestParam("avatar") MultipartFile file) throws IOException {
        return ResponseEntity.ok(userService.changeAvatar(file));
    }

    @PutMapping("/changeBackgroundImage")
    public ResponseEntity<String> changeBackgroundImage(@RequestParam("backgroundImage") MultipartFile file) throws IOException {
        return ResponseEntity.ok(userService.changeBackgroundImage(file));
    }

    @PutMapping("/changeInformation")
    public ResponseEntity<String> changeUserInformation(@RequestBody UserPersonalInformation information){
        return ResponseEntity.ok(userService.changePersonalInformation(information));
    }

    @PutMapping("/changePassword")
    public ResponseEntity<String> changePassword(@RequestParam String oldPassword, @RequestParam String newPassword){
        return ResponseEntity.ok(userService.changePassword(oldPassword, newPassword));
    }
}
