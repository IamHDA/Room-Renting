package com.example.backend.service.implement;

import com.example.backend.Enum.MediaType;
import com.example.backend.Enum.PostStatus;
import com.example.backend.Enum.UserStatus;
import com.example.backend.dto.*;
import com.example.backend.entity.mongoDB.PostMedia;
import com.example.backend.entity.mySQL.*;
import com.example.backend.repository.mongoDB.PostMediaRepository;
import com.example.backend.repository.mySQL.*;
import com.example.backend.service.AddressService;
import com.example.backend.service.PostService;
import com.example.backend.service.UserService;
import com.example.backend.utils.FormatUtil;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;

@Service
public class PostServiceImplement implements PostService {

    @Autowired
    private PostMediaRepository postMediaRepo;
    @Autowired
    private PostRepository postRepo;
    @Autowired
    private PostDetailRepository postDetailRepo;
    @Autowired
    private AddressRepository addressRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserService userService;
    @Autowired
    private AddressService addressService;
    @Autowired
    private WardRepository wardRepo;
    @Autowired
    private FormatUtil formatUtil;

    @Override
    public void uploadPostMedia(List<MultipartFile> media, long postId) throws IOException {
        for(MultipartFile file : media){
            String url = "http://localhost:8080/PostMedia/";
            String mediaUrl = url + file.getOriginalFilename();
            String tmp = file.getContentType().split("/")[0];
            MediaType type = MediaType.valueOf(tmp.toUpperCase());
            postMediaRepo.save(PostMedia.builder()
                    .type(type)
                    .url(mediaUrl)
                    .postId(postId)
                    .build());
            file.transferTo(new File("/home/iamhda/ETC/Room-Renting/backend/src/main/resources/static/PostMedia/" + file.getOriginalFilename()));
        }
    }

    @Override
    public long createPost(AddressDTO addressDTO, CreatePostDTO createPostDTO){
        Address address = addressRepo.findByDetailAndWard_Id(addressDTO.getDetail(), addressDTO.getWardId()).orElse(null);
        if(address == null){
            Ward ward = wardRepo.findById(addressDTO.getWardId());
            Address tmp = new Address();
            tmp.setDetail(addressDTO.getDetail());
            tmp.setWard(ward);
            address = addressRepo.save(tmp);
        }
        PostDetail postDetail = postDetailRepo.save(PostDetail.builder()
                .area(createPostDTO.getArea())
                .price(createPostDTO.getPrice())
                .water(createPostDTO.getWater())
                .bedroom(createPostDTO.getBedroom())
                .bathroom(createPostDTO.getBathroom())
                .electric(createPostDTO.getElectric())
                .parking(createPostDTO.getParking())
                .wifi(createPostDTO.getWifi())
                .build());
        Post post = postRepo.save(Post.builder()
                .title(createPostDTO.getTitle())
                .description(createPostDTO.getDescription())
                .user(userService.getCurrentUser())
                .postDetail(postDetail)
                .address(address)
                .createdAt(LocalDateTime.now())
                .status(PostStatus.ENABLED)
                .build());
        return post.getId();
    }

    @Override
    public List<PostSummaryDTO> getNewPosts() {
        List<Post> posts = postRepo.findNewPosts();
        return posts.stream()
                .map(post -> {
                    PostSummaryDTO postSummaryDTO = modelMapper.map(post, PostSummaryDTO.class);
                    PostDetail postDetail = post.getPostDetail();
                    PostDetailSummaryDTO postDetailSummaryDTO = new PostDetailSummaryDTO();
                    postDetailSummaryDTO.setArea(postDetail.getArea());
                    postDetailSummaryDTO.setPrice(postDetail.getPrice());
                    postSummaryDTO.setDescription(formatUtil.textFormat(post.getDescription()));
                    postSummaryDTO.setUserId(post.getUser().getId());
                    postSummaryDTO.setDtoAddress(addressService.getAddress(post.getAddress()));
                    postSummaryDTO.setPostDetailSummaryDTO(postDetailSummaryDTO);
                    postSummaryDTO.setThumbnailURL(postMediaRepo.findFirstByPostId(post.getId()).getUrl());
                    return postSummaryDTO;
                }).toList();
    }

    @Override
    public PostDTO getPost(long postId) {
        Post post = postRepo.findById(postId).orElse(null);
        User user = post.getUser();
        PostDTO postDTO = modelMapper.map(post, PostDTO.class);
        PostCreater postCreater = modelMapper.map(user, PostCreater.class);
        postCreater.setStatus(UserStatus.ONLINE.getDisplayName());
        postCreater.setJoinTime(formatUtil.getJoinTime(user.getCreateAt()));
        postCreater.setTotalPosts(postRepo.countByUser(user));
        List<PostMediaDTO> postMediaDTOList = postMediaRepo.findByPostId(post.getId())
                .stream()
                .map(postMedia -> modelMapper.map(postMedia, PostMediaDTO.class))
                .toList();
        postDTO.setPostMediaDTO(postMediaDTOList);
        postDTO.setPostCreater(postCreater);
        postDTO.setPostDetailDTO(modelMapper.map(post.getPostDetail(), PostDetailDTO.class));
        postDTO.setDtoAddress(addressService.getAddress(post.getAddress()));
        postDTO.setDescription(formatUtil.textFormat(post.getDescription()));
        return postDTO;
    }
}
