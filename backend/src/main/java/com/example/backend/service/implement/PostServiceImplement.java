package com.example.backend.service.implement;

import com.example.backend.Enum.MediaType;
import com.example.backend.Enum.PostStatus;
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
                    postSummaryDTO.setAddressDTO(addressService.getAddress(post.getAddress()));
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
        PostCreator postCreator = modelMapper.map(user, PostCreator.class);
        postCreator.setStatus(user.getStatus().getDisplayName());
        postCreator.setJoinTime(formatUtil.getJoinTime(user.getCreateAt()));
        postCreator.setTotalPosts(postRepo.countByUser(user));
        List<PostMediaDTO> postMediaDTOList = postMediaRepo.findByPostId(post.getId())
                .stream()
                .map(postMedia -> modelMapper.map(postMedia, PostMediaDTO.class))
                .toList();
        postDTO.setPostMediaDTO(postMediaDTOList);
        postDTO.setPostCreator(postCreator);
        postDTO.setPostDetailDTO(modelMapper.map(post.getPostDetail(), PostDetailDTO.class));
        postDTO.setDtoAddress(addressService.getAddress(post.getAddress()));
        postDTO.setDescription(formatUtil.textFormat(post.getDescription()));
        return postDTO;
    }

    @Override
    public List<PostSummaryDTO> getEnablePostsByUser(long userId) {
        List<Post> posts = postRepo.findByUser_IdAndStatus(userId, PostStatus.ENABLED);
        return convertPostToPostSummary(posts);
    }

    @Override
    public List<PostSummaryDTO> getDisablePostsByUser(long userId) {
        List<Post> posts = postRepo.findByUser_IdAndStatus(userId, PostStatus.DISABLED);
        return convertPostToPostSummary(posts);
    }

    @Override
    public String changePostStatus(long postId, String status) {
        Post post = postRepo.findById(postId).orElse(null);
        post.setStatus(PostStatus.valueOf(status));
        postRepo.save(post);
        return "Change Status Successfully!";
    }

    List<PostSummaryDTO> convertPostToPostSummary(List<Post> posts){
        return posts.stream()
                .map(post -> {
                    PostDetail postDetail = post.getPostDetail();
                    PostSummaryDTO dto = modelMapper.map(post, PostSummaryDTO.class);
                    PostDetailSummaryDTO postDetailSummaryDTO = new PostDetailSummaryDTO();
                    postDetailSummaryDTO.setArea(postDetail.getArea());
                    postDetailSummaryDTO.setPrice(postDetail.getPrice());
                    dto.setUserId(post.getUser().getId());
                    dto.setAddressDTO(addressService.getAddress(post.getAddress()));
                    dto.setThumbnailURL(postMediaRepo.findFirstByPostId(post.getId()).getUrl());
                    dto.setDescription(formatUtil.textFormat(post.getDescription()));
                    dto.setPostDetailSummaryDTO(postDetailSummaryDTO);
                    return dto;
                })
                .toList();
    }
}
