package com.example.backend.service.implement;

import com.example.backend.dto.AccountDTO;
import com.example.backend.entity.mySQL.Account;
import com.example.backend.repository.mySQL.AccountRepository;
import com.example.backend.service.AccountService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.stereotype.Service;

@Service
public class AccountServiceImp implements AccountService {
    @Autowired
    private AccountRepository accountRepo;
    @Autowired
    private ModelMapper modelMapper;

}
