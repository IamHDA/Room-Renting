package com.example.backend.controller;

import com.example.backend.dto.AddNewAccount;
import com.example.backend.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/account")
public class AccountController {
    @Autowired
    private AccountService accountService;

    @GetMapping("/existed")
    public ResponseEntity<Boolean> existedIdentifier(@RequestParam String identifier) {
        return ResponseEntity.ok(accountService.isExistIdentifier(identifier));
    }

    @PostMapping("/addWithPhoneNumber")
    public ResponseEntity<String> addAccountWithPhoneNumber(@RequestParam String identifier, @RequestParam String password) {
        return ResponseEntity.ok(accountService.addNewAccountWithPhoneNumber(identifier, password));
    }

    @PostMapping("/addWithEmail")
    public ResponseEntity<String> addAccountWithEmail(@RequestBody String email) {
        return ResponseEntity.ok(accountService.addNewAccountWithEmail(email));
    }
}
