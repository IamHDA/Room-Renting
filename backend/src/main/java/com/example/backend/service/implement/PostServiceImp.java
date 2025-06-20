package com.example.backend.service.implement;

import com.example.backend.Enum.MediaType;
import com.example.backend.Enum.PostStatus;
import com.example.backend.dto.address.AddressDTO;
import com.example.backend.dto.chat.ChatRoomPost;
import com.example.backend.dto.filter.PostFilter;
import com.example.backend.dto.post.*;
import com.example.backend.entity.mongoDB.ChatRoom;
import com.example.backend.entity.mongoDB.PostMedia;
import com.example.backend.entity.mySQL.*;
import com.example.backend.repository.mongoDB.ChatRoomRepository;
import com.example.backend.repository.mongoDB.MessageRepository;
import com.example.backend.repository.mongoDB.PostMediaRepository;
import com.example.backend.repository.mySQL.*;
import com.example.backend.service.UserService;
import com.example.backend.service.PostService;
import com.example.backend.utils.Util;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class PostServiceImp implements PostService {

    @Autowired
    private PostMediaRepository postMediaRepo;
    @Autowired
    private PostRepository postRepo;
    @Autowired
    private PostDetailRepository postDetailRepo;
    @Autowired
    private AddressRepository addressRepo;
    @Autowired
    private UserService userService;
    @Autowired
    private WardRepository wardRepo;
    @Autowired
    private FilterRepository filterRepo;
    @Autowired
    private Util util;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private ChatRoomRepository chatRoomRepo;

    @Override
    public List<PostSummaryDTO> getNewPosts() {
        List<Post> posts = postRepo.findNewPosts(PostStatus.ENABLED);
        return posts.stream()
                .map(post -> {
                    PostSummaryDTO postSummaryDTO = modelMapper.map(post, PostSummaryDTO.class);
                    PostDetail postDetail = post.getPostDetail();
                    PostDetailSummaryDTO postDetailSummaryDTO = new PostDetailSummaryDTO();
                    postDetailSummaryDTO.setArea(postDetail.getArea());
                    postDetailSummaryDTO.setPrice(postDetail.getPrice());
                    postSummaryDTO.setDescription(util.textFormat(post.getDescription()));
                    postSummaryDTO.setUserId(post.getUser().getId());
                    postSummaryDTO.setAddressDTO(util.getTextAddress(post.getAddress()));
                    postSummaryDTO.setPostDetailSummaryDTO(postDetailSummaryDTO);
                    postSummaryDTO.setThumbnailURL(postMediaRepo.findFirstByPostId(post.getId()).getUrl());
                    return postSummaryDTO;
                }).toList();
    }

    @Override
    public PostDTO getPost(long postId) {
        return util.convertPostToPostDTO(postId);
    }

    @Override
    public List<PostSummaryDTO> getEnablePostsByUser(long userId) {
        List<Post> posts = postRepo.findByUser_IdAndStatus(userId, PostStatus.ENABLED);
        return util.convertPostToPostSummary(posts);
    }

    @Override
    public List<PostSummaryDTO> getDisablePostsByUser(long userId) {
        List<Post> posts = postRepo.findByUser_IdAndStatus(userId, PostStatus.DISABLED);
        return util.convertPostToPostSummary(posts);
    }

    @Override
    public PostDetailDTO getPostDetail(long id) {
        return modelMapper.map(postDetailRepo.findById(id).orElse(null), PostDetailDTO.class);
    }

    @Override
    public PostSummaryList getPostsByCriteria(PostFilter filter) {;
        List<PostSummaryDTO> posts = util.convertPostToPostSummary(filterRepo.filterPost(filter));
        long totalLength = filterRepo.countPost(filter);
        return PostSummaryList.builder()
                .posts(posts)
                .totalLength(totalLength)
                .build();
    }

    @Override
    public String uploadPostMedia(List<MultipartFile> media, long postId) {
        try{
            List<PostMedia> postMediaList = new ArrayList<>();
            for(MultipartFile file : media){
                String url = "http://localhost:8080/PostMedia/";
                String mediaUrl = url + file.getOriginalFilename();
                String tmp = file.getContentType().split("/")[0];
                MediaType type = MediaType.valueOf(tmp.toUpperCase());
                String filePath = "C:/Room-Renting/Media/PostMedia/" + file.getOriginalFilename();
                file.transferTo(new File(filePath));
                postMediaList.add(PostMedia.builder()
                            .type(type)
                            .url(mediaUrl)
                            .postId(postId)
                            .filePath(filePath)
                        .build());
            }
            postMediaRepo.saveAll(postMediaList);
        }catch (Exception e){
            return "Upload images failed!";
        }
        return "Upload images successfully!";
    }

    @Override
    public String createPostWithRollBack(AddressDTO addressDTO, CreatePostDTO createPostDTO, List<MultipartFile> files) {
        long postId = createPost(addressDTO, createPostDTO);
        String response = uploadPostMedia(files, postId);
        if(response.equals("Upload images failed!")){
            postRepo.deleteById(postId);
            return "Error with uploading images";
        }
        return "Post created successfully";
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
        PostDetail postDetail = modelMapper.map(createPostDTO, PostDetail.class);
        Post post = Post.builder()
                .status(PostStatus.ENABLED)
                .createdAt(LocalDateTime.now())
                .user(userService.getCurrentUser())
                .address(address)
                .description(createPostDTO.getDescription())
                .postDetail(postDetail)
                .title(createPostDTO.getTitle())
                .build();
        return postRepo.save(post).getId();
    }

    @Override
    public String changePostStatus(long postId, String status) {
        Post post = postRepo.findById(postId).orElse(null);
        post.setStatus(PostStatus.valueOf(status));
        postRepo.save(post);
        return "Change Post's Status Successfully!";
    }

    @Transactional
    @Override
    public String deletePost(long postId) {
        Post post = postRepo.findById(postId).orElse(null);
        List<Post> posts = postRepo.findByAddress(post.getAddress());
        if(posts.size() == 1) addressRepo.delete(post.getAddress());
        postRepo.deleteById(postId);
        postMediaRepo.deleteByPostId(postId);
        return "Post deleted successfully!";
    }

    @Override
    public String changePostInformation(long postId, ChangePostInformation changePostInformation) {
        Post post = postRepo.findById(postId).orElse(null);
        PostDetail postDetail = modelMapper.map(changePostInformation.getPostDetailDTO(), PostDetail.class);
        postDetail.setId(post.getPostDetail().getId());
        post.setPostDetail(postDetail);
        post.setTitle(changePostInformation.getTitle());
        post.setDescription(changePostInformation.getDescription());
        post.setUpdatedAt(LocalDateTime.now());
        ChatRoom chatRoom = chatRoomRepo.findByChatRoomPost_Id(postId);
        ChatRoomPost chatRoomPost = chatRoom.getChatRoomPost();
        chatRoomPost.setArea(postDetail.getArea());
        chatRoomPost.setPrice(postDetail.getPrice());
        chatRoomPost.setTitle(post.getTitle());
        chatRoomRepo.save(chatRoom);
        postRepo.save(post);
        return "Post updated successfully!";
    }
}