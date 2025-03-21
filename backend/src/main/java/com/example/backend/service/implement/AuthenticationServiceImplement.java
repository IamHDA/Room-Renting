package com.example.backend.service.implement;

import com.example.backend.Enum.Role;
import com.example.backend.Enum.UserStatus;
import com.example.backend.dto.AuthenticationResponse;
import com.example.backend.dto.payload.LoginRequest;
import com.example.backend.dto.payload.RegisterRequest;
import com.example.backend.entity.mySQL.Account;
import com.example.backend.entity.mySQL.Token;
import com.example.backend.entity.mySQL.User;
import com.example.backend.repository.mySQL.AccountRepository;
import com.example.backend.repository.mySQL.TokenRepository;
import com.example.backend.repository.mySQL.UserRepository;
import com.example.backend.security.JwtTokenProvider;
import com.example.backend.service.AuthenticationService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.nio.file.Files;

import java.time.LocalDateTime;
import java.util.List;


@Service
public class AuthenticationServiceImplement implements AuthenticationService {

    @Autowired
    private TokenRepository tokenRepo;
    @Autowired
    private AccountRepository accountRepo;
    @Autowired
    private UserRepository userRepo;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private AuthenticationManager authenticationManager;

    @Override
    public AuthenticationResponse register(RegisterRequest request) {
        if(accountRepo.findByIdentifier(request.getIdentifier()).isPresent()){
            return new AuthenticationResponse(null, null, "Identifier is already in use!");
        }
        User newUser = userRepo.findByPhoneNumberOrEmail(request.getIdentifier(), request.getIdentifier()).orElseGet(() -> {
            User user = new User();
            user.setFullName(request.getFullName());
            user.setPhoneNumber(request.getIdentifier());
            user.setCreateAt(LocalDateTime.now());
            user.setRole(Role.USER);
            user.setStatus(UserStatus.ONLINE);

            try {
                ClassPathResource avatarResource = new ClassPathResource("static/default-avatar.jpeg");
                user.setAvatar(Files.readAllBytes(avatarResource.getFile().toPath()));
                ClassPathResource bgResource = new ClassPathResource("static/default-background.jpeg");
                user.setBackgroundImage(Files.readAllBytes(bgResource.getFile().toPath()));
            } catch (IOException e) {
                throw new RuntimeException();
            }
            userRepo.save(user);
            return user;
        });
        Account account = new Account();
        account.setIdentifier(request.getIdentifier());
        account.setPassword(new BCryptPasswordEncoder(12).encode(request.getPassword()));
        account.setUser(newUser);
        accountRepo.save(account);
        String accessToken = jwtTokenProvider.generateAccessToken(account);
        String refreshToken = jwtTokenProvider.generateRefreshToken(account);

        saveAccountToken(accessToken, refreshToken, account);
        return new AuthenticationResponse(accessToken, refreshToken, "User registration successful");
    }

    @Override
    public AuthenticationResponse login(LoginRequest request) {
        Account account = accountRepo.findByIdentifier(request.getIdentifier()).orElse(null);
        if(account == null){
            return new AuthenticationResponse(null, null, "Account not found!");
        }
        try{
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.getIdentifier(), request.getPassword()));
        }catch(BadCredentialsException e){
            return new AuthenticationResponse(null, null, "Password is incorrect!");
        }
        String accessToken = jwtTokenProvider.generateAccessToken(account);
        String refreshToken = jwtTokenProvider.generateRefreshToken(account);
        List<Token> validTokenByUser = tokenRepo.findByAccountIdAndLoggedOutFalse(account.getId());
        if(!validTokenByUser.isEmpty()){
            validTokenByUser.forEach((token) -> {
                token.setLoggedOut(true);
            });
        }
        saveAccountToken(accessToken, refreshToken, account);
        return new AuthenticationResponse(accessToken, refreshToken, "User login successful");
    }

    @Override
    public ResponseEntity refreshToken(HttpServletRequest request, HttpServletResponse response) {
        String authHeader = request.getHeader("Authorization");
        if(authHeader == null || !authHeader.startsWith("Bearer ")){
            return new ResponseEntity(HttpStatus.UNAUTHORIZED);
        }
        String token = authHeader.substring(7);
        String identifier = jwtTokenProvider.extractAccountIdentifier(token);
        Account account = accountRepo.findByIdentifier(identifier).orElse(null);
        if(account == null){
            return new ResponseEntity(new AuthenticationResponse(null, null, "Account not found!"), HttpStatus.UNAUTHORIZED);
        }
        if(jwtTokenProvider.isValidRefreshToken(token, account)){
            String accessToken = jwtTokenProvider.generateAccessToken(account);
            String refreshToken = jwtTokenProvider.generateRefreshToken(account);
            saveAccountToken(accessToken, refreshToken, account);
            return new ResponseEntity(new AuthenticationResponse(accessToken, refreshToken, "New Token generated"), HttpStatus.OK);
        }
        return new ResponseEntity(HttpStatus.UNAUTHORIZED);
    }

    private void saveAccountToken(String accessToken, String refreshToken, Account account) {
        Token token = new Token();
        token.setAccessToken(accessToken);
        token.setRefreshToken(refreshToken);
        token.setLoggedOut(false);
        token.setAccount(account);
        tokenRepo.save(token);
    }
}