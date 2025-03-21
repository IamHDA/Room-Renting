package com.example.backend.service;

import com.example.backend.dto.AuthenticationResponse;
import com.example.backend.dto.payload.LoginRequest;
import com.example.backend.dto.payload.RegisterRequest;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.ResponseEntity;

public interface AuthenticationService {
    public AuthenticationResponse register(RegisterRequest request);
    public AuthenticationResponse login(LoginRequest request);
    public ResponseEntity refreshToken(HttpServletRequest request, HttpServletResponse response);
}
