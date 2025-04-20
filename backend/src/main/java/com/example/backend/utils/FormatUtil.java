package com.example.backend.utils;

import com.example.backend.dto.post.PostCreator;
import com.example.backend.dto.post.PostDTO;
import com.example.backend.dto.post.PostDetailDTO;
import com.example.backend.dto.post.PostMediaDTO;
import com.example.backend.entity.mySQL.Post;
import com.example.backend.entity.mySQL.User;
import com.example.backend.repository.mongoDB.PostMediaRepository;
import com.example.backend.repository.mySQL.PostRepository;
import com.example.backend.service.AddressService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component
public class FormatUtil {
    @Autowired
    private PostRepository postRepo;
    @Autowired
    private PostMediaRepository postMediaRepo;
    @Autowired
    private AddressService addressService;
    @Autowired
    private ModelMapper modelMapper;

    public String textFormat(String text){
        return text.replace("\n", "<br>");
    }

    public int getJoinTime(LocalDateTime localDateTime) {
        LocalDateTime now = LocalDateTime.now();
        Instant instant1 = now.toInstant(ZoneOffset.of("+8"));
        Instant instant2 = localDateTime.toInstant(ZoneOffset.of("+8"));
        long miliseconds1 = instant1.toEpochMilli();
        long miliseconds2 = instant2.toEpochMilli();
        long diff = (miliseconds1 - miliseconds2) / (1000 * 60 * 60 * 24);
        if (diff == 0) return 1;
        return (int) diff;
    }

    public PostDTO convertPostToPostDTO(long postId){
        Post post = postRepo.findById(postId).orElse(null);
        User user = post.getUser();
        PostDTO postDTO = modelMapper.map(post, PostDTO.class);
        PostCreator postCreator = modelMapper.map(user, PostCreator.class);
        postCreator.setStatus(user.getStatus().getDisplayName());
        postCreator.setJoinTime(getJoinTime(user.getCreatedAt()));
        postCreator.setTotalPosts(postRepo.countByUser(user));
        List<PostMediaDTO> postMediaDTOList = postMediaRepo.findByPostId(post.getId())
                .stream()
                .map(postMedia -> modelMapper.map(postMedia, PostMediaDTO.class))
                .toList();
        postDTO.setPostMediaDTO(postMediaDTOList);
        postDTO.setPostCreator(postCreator);
        postDTO.setPostDetailDTO(modelMapper.map(post.getPostDetail(), PostDetailDTO.class));
        postDTO.setAddressDTO(addressService.getAddress(post.getAddress()));
        postDTO.setDescription(textFormat(post.getDescription()));
        return postDTO;
    }
}
