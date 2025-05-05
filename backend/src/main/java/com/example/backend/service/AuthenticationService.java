package com.example.backend.service;

import com.example.backend.dto.AuthenticationResponse;
import com.example.backend.dto.payload.LoginRequest;
import com.example.backend.dto.payload.RegisterRequest;
import com.example.backend.entity.mySQL.User;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface AuthenticationService {
    AuthenticationResponse register(RegisterRequest request);
    AuthenticationResponse login(LoginRequest request);
    ResponseEntity refreshToken(HttpServletRequest request, HttpServletResponse response);
}
