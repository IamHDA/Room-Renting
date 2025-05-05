package com.example.backend.service.implement;

import com.example.backend.Enum.Provider;
import com.example.backend.entity.mySQL.Account;
import com.example.backend.entity.mySQL.User;
import com.example.backend.repository.mySQL.AccountRepository;
import com.example.backend.repository.mySQL.UserRepository;
import com.example.backend.service.AccountService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AccountServiceImp implements AccountService {
    @Autowired
    private AccountRepository accountRepo;
    @Autowired
    private UserService userService;
    @Autowired
    private UserRepository userRepo;

    @Override
    public boolean isExistIdentifier(String identifier) {
        return accountRepo.findByIdentifier(identifier).isPresent();
    }

    @Override
    public String addNewAccountWithPhoneNumber(String identifier, String password){
        User user = userService.getCurrentUser();
        String encryptedPassword = new BCryptPasswordEncoder(12).encode(password);
        user.setPhoneNumber(identifier);
        Account newAccount = new Account();
        if(identifier.contains("@")) newAccount.setProvider(Provider.GOOGLE);
        else newAccount.setProvider(Provider.LOCAL);
        newAccount.setIdentifier(identifier);
        newAccount.setUser(user);
        accountRepo.save(newAccount);
        List<Account> accounts = accountRepo.findByUser(user);
        for(Account account : accounts){
            account.setPassword(encryptedPassword);
        }
        accountRepo.saveAll(accounts);
        userRepo.save(user);
        return "Add phone number successfully!";
    }

    @Override
    public String addNewAccountWithEmail(String email) {
        User user = userService.getCurrentUser();
        user.setEmail(email);
        Account existAccount = accountRepo.findByIdentifier(user.getPhoneNumber()).orElse(null);
        Account newAccount = new Account();
        newAccount.setProvider(Provider.GOOGLE);
        newAccount.setIdentifier(email);
        newAccount.setUser(user);
        newAccount.setPassword(existAccount.getPassword());
        userRepo.save(user);
        accountRepo.save(newAccount);
        return "Add email successfully!";
    }

}
