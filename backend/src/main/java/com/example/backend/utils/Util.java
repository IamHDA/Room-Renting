package com.example.backend.utils;

import com.example.backend.dto.post.*;
import com.example.backend.entity.mySQL.*;
import com.example.backend.repository.mongoDB.PostMediaRepository;
import com.example.backend.repository.mySQL.PostRepository;
import com.example.backend.service.AddressService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.io.File;
import java.io.IOException;
import java.sql.SQLOutput;
import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.List;

@Component
public class Util {
    @Autowired
    private PostRepository postRepo;
    @Autowired
    private PostMediaRepository postMediaRepo;
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

    public List<PostSummaryDTO> convertPostToPostSummary(List<Post> posts){
        return posts.stream()
                .map(post -> {
                    PostDetail postDetail = post.getPostDetail();
                    PostSummaryDTO dto = modelMapper.map(post, PostSummaryDTO.class);
                    PostDetailSummaryDTO postDetailSummaryDTO = modelMapper.map(postDetail, PostDetailSummaryDTO.class);
                    dto.setUserId(post.getUser().getId());
                    dto.setAddressDTO(getTextAddress(post.getAddress()));
                    dto.setThumbnailURL(postMediaRepo.findFirstByPostId(post.getId()).getUrl());
                    dto.setDescription(textFormat(post.getDescription()));
                    dto.setPostDetailSummaryDTO(postDetailSummaryDTO);
                    return dto;
                })
                .toList();
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
        postDTO.setAddressDTO(getTextAddress(post.getAddress()));
        postDTO.setDescription(textFormat(post.getDescription()));
        return postDTO;
    }

    public String getTextAddress(Address address) {
        if(address == null) return "";
        String addressDetail = address.getDetail();
        Ward addressWard = address.getWard();
        District addressDistrict = addressWard.getDistrict();
        City addressCity = addressDistrict.getCity();
        return (addressDetail.isBlank() ? "" : (addressDetail + ", ")) + addressWard.getName() + ", " + addressDistrict.getName() + ", " + addressCity.getName();
    }

    public void deleteFile(String filePath) throws IOException {
        File file = new File(filePath);
        if(file.exists()){
            if(file.delete()) System.out.println("File have been deleted!");
            else throw new IOException("Fail to delete file" + filePath);
        }
    }
}
