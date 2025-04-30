package com.example.backend.service;

import com.example.backend.entity.mySQL.Account;

public interface TokenService {
    void disableOldTokens(Account account);
    void saveAccountToken(String accessToken, String refreshToken, Account account);
}
