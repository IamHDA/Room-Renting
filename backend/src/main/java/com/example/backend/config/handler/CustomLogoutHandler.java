package com.example.backend.config.handler;

import com.example.backend.Enum.UserStatus;
import com.example.backend.entity.mySQL.Token;
import com.example.backend.entity.mySQL.User;
import com.example.backend.repository.mySQL.TokenRepository;
import com.example.backend.repository.mySQL.UserRepository;
import com.example.backend.service.UserService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutHandler;
import org.springframework.stereotype.Component;

@Component
public class CustomLogoutHandler implements LogoutHandler {

    @Autowired
    private TokenRepository tokenRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private UserService userService;

    @Override
    public void logout(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null && !authHeader.startsWith("Bearer ")) {
            return;
        }
        String accessToken = authHeader.substring(7);
        Token storedToken = tokenRepo.findByAccessToken(accessToken).orElse(null);
        User user = userService.getCurrentUser();
        user.setStatus(UserStatus.OFFLINE);
        userRepo.save(user);
        if(accessToken != null) {
            storedToken.setLoggedOut(true);
            tokenRepo.save(storedToken);
        }
        System.out.println("Đây là logout");
    }
}
