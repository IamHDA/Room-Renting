package com.example.backend.controller;

import com.example.backend.dto.AccountDTO;
import com.example.backend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping("/currentAccount")
    public ResponseEntity<AccountDTO> getCurrentAccount() {
        return ResponseEntity.ok(accountService.getCurrentAccount());
    }
}
