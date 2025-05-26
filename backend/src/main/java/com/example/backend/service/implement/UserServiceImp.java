package com.example.backend.service.implement;

import com.example.backend.dto.user.UserHeader;
import com.example.backend.dto.user.UserPersonalInformation;
import com.example.backend.dto.user.UserProfile;
import com.example.backend.entity.mySQL.Account;
import com.example.backend.entity.mySQL.Address;
import com.example.backend.entity.mySQL.User;
import com.example.backend.entity.mySQL.Ward;
import com.example.backend.repository.mySQL.AccountRepository;
import com.example.backend.repository.mySQL.UserRepository;
import com.example.backend.repository.mySQL.WardRepository;
import com.example.backend.service.AuthenticationService;
import com.example.backend.service.UserRatingService;
import com.example.backend.service.UserService;
import com.example.backend.utils.Util;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.util.List;

@Service
public class UserServiceImp implements UserService {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private Util util;
    @Autowired
    private AccountRepository accountRepo;
    @Autowired
    private WardRepository wardRepo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);
    @Autowired
    private UserRatingService userRatingService;

    @Override
    public User getCurrentUser() {
        String currentIdentifier = "";
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && !(authentication instanceof AnonymousAuthenticationToken)){
            if(authentication instanceof UsernamePasswordAuthenticationToken){
                currentIdentifier = authentication.getName().trim();
            }else if(authentication instanceof OAuth2AuthenticationToken){
                OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
                currentIdentifier = oAuth2User.getAttributes().get("email").toString();
            }
        }
        return userRepo.findByPhoneNumberOrEmail(currentIdentifier, currentIdentifier)
                .orElseThrow(() -> new UsernameNotFoundException("Người dùng không tồn tại"));
    }
    
    @Override
    public UserProfile getProfile(long userId) {
        User user = userRepo.findById(userId);
        UserProfile userProfile = modelMapper.map(user, UserProfile.class);
        userProfile.setStatus(user.getStatus().getDisplayName());
        userProfile.setJoinTime(util.getJoinTime(user.getCreatedAt()));
        userProfile.setAddressDTO(util.getTextAddress(user.getAddress()));
        userProfile.setTotalRating(userRatingService.getTotalRating(userId));
        return userProfile;
    }

    @Override
    public UserPersonalInformation getPersonalInformation(){
        User user = getCurrentUser();
        UserPersonalInformation information = modelMapper.map(getCurrentUser(), UserPersonalInformation.class);
        information.setAddressText(util.getTextAddress(user.getAddress()));
        return information;
    }

    @Override
    public UserHeader getUserHeader(long userId) {
        return modelMapper.map(userRepo.findById(userId), UserHeader.class);
    }

    @Override
    public String changeAvatar (MultipartFile file) throws IOException {
        User user = getCurrentUser();
        user.setAvatar(file.getBytes());
        userRepo.save(user);
        return "Avatar changed successfully!";
    }

    @Override
    public String changeBackgroundImage(MultipartFile file) throws IOException {
        User user = getCurrentUser();
        user.setBackgroundImage(file.getBytes());
        userRepo.save(user);
        return "BackgroundImage changed successfully!";
    }

    @Override
    public String changePersonalInformation(UserPersonalInformation information){
        User currentUser = getCurrentUser();;
        System.out.println(information.getAddressText());
        if(!information.getAddressText().isEmpty()){
            String[] addressText = new String[] {"", "", "", ""};
            System.out.println(information.getAddressText());
            addressText = information.getAddressText().split(", ");
            System.out.println(addressText);
            Ward ward = wardRepo.findByName(addressText[2]);
            Address address = currentUser.getAddress() == null ? new Address() : currentUser.getAddress();
            if(addressText.length == 4){
                address.setDetail(addressText[3]);
            }
            address.setWard(ward);
            currentUser.setAddress(address);
        }
        currentUser.setFullName(information.getFullName());
        userRepo.save(currentUser);
        return "Change user information successfully!";
    }

    @Override
    public String changePassword(String oldPassword, String newPassword){
        User user = getCurrentUser();
        List<Account> accounts = accountRepo.findByUser(user);
        for(Account account : accounts){
            String currentPassword = account.getPassword();
            if(!currentPassword.isEmpty()){
                if(!encoder.matches(oldPassword, currentPassword)) return "Current password is incorrect!";
                account.setPassword(encoder.encode(newPassword));
                accountRepo.save(account);
            }
        }
        return "Change password successfully!";
    }

    @Override
    public String getUserEmail(long userId) {
        return userRepo.findById(userId).getEmail();
    }

    @Override
    public String getUserPhoneNumber(long userId) {
        return userRepo.findById(userId).getPhoneNumber();
    }

    public void addDefaultProfileImage(User user){
        try {
            ClassPathResource avatarResource = new ClassPathResource("static/default-avatar.jpeg");
            user.setAvatar(Files.readAllBytes(avatarResource.getFile().toPath()));
            ClassPathResource bgResource = new ClassPathResource("static/default-background.jpeg");
            user.setBackgroundImage(Files.readAllBytes(bgResource.getFile().toPath()));
        } catch (IOException e) {
            throw new RuntimeException();
        }
        userRepo.save(user);
    }
}
