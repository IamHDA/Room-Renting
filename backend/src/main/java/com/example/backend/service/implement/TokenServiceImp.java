package com.example.backend.service.implement;

import com.example.backend.entity.mySQL.Account;
import com.example.backend.entity.mySQL.Token;
import com.example.backend.repository.mySQL.TokenRepository;
import com.example.backend.security.JwtTokenProvider;
import com.example.backend.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TokenServiceImp implements TokenService {

    @Autowired
    private TokenRepository tokenRepo;

    public void disableOldTokens(Account account) {
        List<Token> validTokenByUser = tokenRepo.findByAccount_IdAndLoggedOutFalse(account.getId());
        if(!validTokenByUser.isEmpty()){
            validTokenByUser.forEach((token) -> {
                token.setLoggedOut(true);
            });
        }
    }

    public void saveAccountToken(String accessToken, String refreshToken, Account account) {
        Token token = new Token();
        token.setAccessToken(accessToken);
        token.setRefreshToken(refreshToken);
        token.setLoggedOut(false);
        token.setAccount(account);
        token.setCreatedAt(LocalDateTime.now());
        tokenRepo.save(token);
    }
}
