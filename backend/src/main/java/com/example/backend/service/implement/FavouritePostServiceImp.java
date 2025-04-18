package com.example.backend.service.implement;

import com.example.backend.dto.PostDetailSummaryDTO;
import com.example.backend.dto.PostSummaryDTO;
import com.example.backend.entity.mySQL.FavouritePost;
import com.example.backend.entity.mySQL.Post;
import com.example.backend.entity.mySQL.PostDetail;
import com.example.backend.entity.mySQL.User;
import com.example.backend.repository.mongoDB.PostMediaRepository;
import com.example.backend.repository.mySQL.FavouritePostRepository;
import com.example.backend.repository.mySQL.PostRepository;
import com.example.backend.service.AddressService;
import com.example.backend.service.FavouritePostService;
import com.example.backend.service.UserService;
import com.example.backend.utils.FormatUtil;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class FavouritePostServiceImp implements FavouritePostService {

    @Autowired
    private UserService userService;
    @Autowired
    private PostRepository postRepo;
    @Autowired
    private FavouritePostRepository favouritePostRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private FormatUtil formatUtil;
    @Autowired
    private AddressService addressService;
    @Autowired
    private PostMediaRepository postMediaRepo;

    @Override
    public String addToFavourite(long postId){
        User user = userService.getCurrentUser();
        Post post = postRepo.findById(postId).orElse(null);
        FavouritePost favouritePost = new FavouritePost(post, user);
        favouritePostRepo.save(favouritePost);
        return "Added post to favourite";
    }

    @Transactional
    @Override
    public String deleteFromFavourite(long id) {
        User user = userService.getCurrentUser();
        favouritePostRepo.deleteByPost_IdAndUser(id, user);
        return "Removed post from favourite";
    }

    @Override
    public List<Long> getFavouritePostsIdByUser() {
        User user = userService.getCurrentUser();
        return favouritePostRepo.findByUser(user)
                .stream()
                .map(favouritePost -> favouritePost.getPost().getId())
                .toList();
    }

    @Override
    public List<PostSummaryDTO> getFavouritePostsByUser(int order) {
        User user = userService.getCurrentUser();
        List<Post> posts = new ArrayList<>();
        if(order == 1) posts = favouritePostRepo.findByUserOrderByCreatedAtAsc(user)
                .stream()
                .map(FavouritePost::getPost)
                .toList();
        else if(order == 2) posts = favouritePostRepo.findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(FavouritePost::getPost)
                .toList();
        else if(order == 3) posts = favouritePostRepo.findByUserOrderByPostPostDetailPriceAsc(user)
                .stream()
                .map(FavouritePost::getPost)
                .toList();
        else if(order == 4) posts = favouritePostRepo.findByUserOrderByPostPostDetailPriceDesc(user)
                .stream()
                .map(FavouritePost::getPost)
                .toList();
        return mapPostToPostSummaryDTO(posts);
    }

    List<PostSummaryDTO> mapPostToPostSummaryDTO(List<Post> posts) {
        return posts.
                stream()
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
                })
                .toList();
    }
}

