package com.example.backend.security;

import com.example.backend.entity.mySQL.Account;
import com.example.backend.entity.mySQL.User;
import com.example.backend.repository.mySQL.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class MyUserDetailService implements UserDetailsService {

    @Autowired
    private AccountRepository accountRepo;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Account account = accountRepo.findByIdentifier(username);
        if(account == null){
            System.out.println("Account not found");
            throw new UsernameNotFoundException("Account not found");
        }
        User user = account.getUser();
        return new UserPrinciple(account, user);
    }
}
