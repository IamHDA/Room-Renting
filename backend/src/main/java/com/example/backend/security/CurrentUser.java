package com.example.backend.security;

import com.example.backend.entity.mySQL.Account;
import com.example.backend.entity.mySQL.User;
import com.example.backend.repository.mySQL.AccountRepository;
import com.example.backend.repository.mySQL.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

import java.util.Optional;

@Component
public class CurrentUser {

    @Autowired
    private AccountRepository accountRepo;

    private User getCurrentUser(){
        String accountIdentifier = "";
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!(authentication instanceof AnonymousAuthenticationToken)){
            accountIdentifier = authentication.getName();
        }
        return accountRepo.findByIdentifier(accountIdentifier).orElse(null).getUser();
    }
}
