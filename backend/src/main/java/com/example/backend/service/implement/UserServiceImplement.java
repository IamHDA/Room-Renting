package com.example.backend.service.implement;

import com.example.backend.dto.UserHeader;
import com.example.backend.entity.mySQL.User;
import com.example.backend.repository.mySQL.UserRepository;
import com.example.backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImplement implements UserService {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public User getCurrentUser() {
        String currentIdentifier = "";
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(!(authentication instanceof AnonymousAuthenticationToken)){
            currentIdentifier = authentication.getName();
        }
        User currentUser = userRepo.findByPhoneNumberOrEmail(currentIdentifier, currentIdentifier).orElseThrow();
        return currentUser;
    }
}
