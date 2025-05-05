package com.example.backend.config.handler;

import com.example.backend.Enum.Provider;
import com.example.backend.Enum.Role;
import com.example.backend.Enum.UserStatus;
import com.example.backend.dto.AuthenticationResponse;
import com.example.backend.dto.payload.LoginRequest;
import com.example.backend.entity.mySQL.Account;
import com.example.backend.entity.mySQL.Token;
import com.example.backend.entity.mySQL.User;
import com.example.backend.repository.mySQL.AccountRepository;
import com.example.backend.repository.mySQL.TokenRepository;
import com.example.backend.repository.mySQL.UserRepository;
import com.example.backend.security.JwtTokenProvider;
import com.example.backend.service.AuthenticationService;
import com.example.backend.service.TokenService;
import com.example.backend.service.UserService;
import com.example.backend.service.implement.AuthenticationServiceImp;
import com.example.backend.service.implement.UserServiceImp;
import com.example.backend.utils.Util;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Map;

@Component
public class CustomOauth2SuccessHandler implements AuthenticationSuccessHandler {
    @Autowired
    private AccountRepository accountRepo;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private TokenService tokenService;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {
        OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
        OAuth2AuthenticationToken authToken = (OAuth2AuthenticationToken) authentication;
        SecurityContextHolder.getContext().setAuthentication(authToken);
        String email = oauth2User.getAttributes().get("email").toString();
        String name = oauth2User.getAttributes().get("name").toString();
        String provider = authToken.getAuthorizedClientRegistrationId();
        Account account = accountRepo.findByIdentifier(email).orElse(null);
        if(account == null){
            User user = User.builder()
                    .createdAt(LocalDateTime.now())
                    .email(email)
                    .fullName(name)
                    .role(Role.USER)
                    .status(UserStatus.ONLINE)
                    .build();
            userService.addDefaultProfileImage(user);
            userRepo.save(user);
            account = new Account();
            account.setIdentifier(email);
            account.setProvider(Provider.valueOf(provider.toUpperCase()));
            account.setUser(user);
            account = accountRepo.save(account);
        }
        account.getUser().setStatus(UserStatus.ONLINE);
        userRepo.save(account.getUser());
        tokenService.disableOldTokens(account);
        String accessToken = jwtTokenProvider.generateAccessToken(account);
        String refreshToken = jwtTokenProvider.generateRefreshToken(account);
        tokenService.saveAccountToken(accessToken, refreshToken, account);

        String html = "<script>" +
                "window.opener.postMessage({" +
                "accessToken: '" + accessToken + "'," +
                "refreshToken: '" + refreshToken + "'" +
                "}, '*');" +
                "window.close();" +
                "</script>";

        response.setContentType("text/html");
        response.getWriter().write(html);
    }
}
