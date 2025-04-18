package com.example.backend.service.implement;

import com.example.backend.Enum.UserStatus;
import com.example.backend.dto.UserPersonalInformation;
import com.example.backend.dto.UserProfile;
import com.example.backend.entity.mySQL.Account;
import com.example.backend.entity.mySQL.Address;
import com.example.backend.entity.mySQL.User;
import com.example.backend.entity.mySQL.Ward;
import com.example.backend.repository.mySQL.AccountRepository;
import com.example.backend.repository.mySQL.AddressRepository;
import com.example.backend.repository.mySQL.UserRepository;
import com.example.backend.repository.mySQL.WardRepository;
import com.example.backend.service.AddressService;
import com.example.backend.service.UserService;
import com.example.backend.utils.FormatUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@Service
public class UserServiceImplement implements UserService {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private FormatUtil formatUtil;
    @Autowired
    private AddressService addressService;
    @Autowired
    private AccountRepository accountRepo;
    @Autowired
    private WardRepository wardRepo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder(12);

    @Override
    public User getCurrentUser() {
        String currentIdentifier = "";
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if(authentication != null && !(authentication instanceof AnonymousAuthenticationToken)){
            currentIdentifier = authentication.getName().trim();
            System.out.println("Current User: " + currentIdentifier);
        }
        User currentUser = userRepo.findByPhoneNumberOrEmail(currentIdentifier, currentIdentifier).orElseThrow(() -> new UsernameNotFoundException("Người dùng không tồn tại"));
        currentUser.setStatus(UserStatus.ONLINE);
        userRepo.save(currentUser);
        return currentUser;
    }

    @Override
    public UserProfile getProfile(long userId) {
        User user = userRepo.findById(userId).orElse(null);
        UserProfile userProfile = modelMapper.map(user, UserProfile.class);
        userProfile.setStatus(user.getStatus().getDisplayName());
        userProfile.setJoinTime(formatUtil.getJoinTime(user.getCreateAt()));
        userProfile.setDtoAddress(addressService.getAddress(user.getAddress()));
        return userProfile;
    }

    @Override
    public UserPersonalInformation getPersonalInformation(){
        User user = getCurrentUser();
        UserPersonalInformation information = modelMapper.map(getCurrentUser(), UserPersonalInformation.class);
        information.setAddressText(addressService.getAddress(user.getAddress()));
        return information;
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
        User user = userRepo.findByPhoneNumber(information.getPhoneNumber());
        if(information.getAddressText().isEmpty()){
            String[] addressText = new String[] {"", "", "", ""};
            addressText = information.getAddressText().split(", ");
            Ward ward = wardRepo.findByName(addressText[2]);
            Address address = user.getAddress() == null ? new Address() : user.getAddress();
            address.setDetail(addressText[3]);
            address.setWard(ward);
            user.setAddress(address);
        }
        user.setFullName(information.getFullName());
        user.setPhoneNumber(information.getPhoneNumber());
        user.setEmail(information.getEmail());
        userRepo.save(user);
        return "Change user information successfully!";
    }

    @Override
    public String changePassword(String oldPassword, String newPassword){
        System.out.println(oldPassword);
        System.out.println(newPassword);
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
}
