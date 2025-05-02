package com.example.backend.service;

import com.example.backend.dto.AddNewAccount;

public interface AccountService {
    boolean isExistIdentifier(String identifier);
    String addNewAccountWithPhoneNumber(String identifier, String password);
    String addNewAccountWithEmail(String email);
}
