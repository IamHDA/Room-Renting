package com.example.backend.controller;

import com.example.backend.dto.UserHeader;
import com.example.backend.entity.mySQL.User;
import com.example.backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
