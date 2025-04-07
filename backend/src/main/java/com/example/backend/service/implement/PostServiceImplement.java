package com.example.backend.service.implement;

import com.example.backend.Enum.MediaType;
import com.example.backend.Enum.PostStatus;
import com.example.backend.dto.AddressDTO;
import com.example.backend.dto.CreatePostDTO;
import com.example.backend.entity.mongoDB.PostMedia;
import com.example.backend.entity.mySQL.Address;
import com.example.backend.entity.mySQL.Post;
import com.example.backend.entity.mySQL.PostDetail;
import com.example.backend.entity.mySQL.Ward;
import com.example.backend.repository.mongoDB.PostMediaRepository;
import com.example.backend.repository.mySQL.AddressRepository;
import com.example.backend.repository.mySQL.PostDetailRepository;
import com.example.backend.repository.mySQL.PostRepository;
import com.example.backend.repository.mySQL.WardRepository;
import com.example.backend.service.PostService;
import com.example.backend.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.print.attribute.standard.Media;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Service
public class PostServiceImplement implements PostService {

    @Autowired
    private PostMediaRepository postMediaRepo;
    @Autowired
    private PostRepository postRepo;
    @Autowired
    private AddressRepository addressRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private UserService userService;
    @Autowired
    private PostDetailRepository postDetailRepo;
//    @Autowired
//    private FormatUtil formatUtil;
    @Autowired
    private WardRepository wardRepo;

    private final String url = "http://localhost:8080/PostMedia/";

    @Override
    public void uploadPostMedia(List<MultipartFile> media, long postId) throws IOException {
        for(MultipartFile file : media){
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
}
