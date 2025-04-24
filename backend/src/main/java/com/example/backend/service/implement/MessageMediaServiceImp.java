package com.example.backend.service.implement;

import com.example.backend.Enum.MediaType;
import com.example.backend.dto.chat.MessageMediaDTO;
import com.example.backend.entity.mongoDB.MessageMedia;
import com.example.backend.repository.mongoDB.MessageMediaRepository;
import com.example.backend.service.MessageMediaService;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
public class MessageMediaServiceImp implements MessageMediaService {
    @Autowired
    private MessageMediaRepository messageMediaRepo;
    @Autowired
    private ModelMapper modelMapper;

    @Override
    public List<MessageMediaDTO> uploadMessageMedia(List<MultipartFile> files) {
        List<MessageMedia> messageMediaList = new ArrayList<>();
        try {
            for(MultipartFile file : files){
                String url = "http://localhost:8080/MessageMedia/";
                String mediaUrl = url + file.getOriginalFilename();
                String tmp = file.getContentType().split("/")[0];
                MediaType type = MediaType.valueOf(tmp.toUpperCase());
                messageMediaList.add(MessageMedia.builder()
                        .type(type)
                        .url(mediaUrl)
                        .build());
                file.transferTo(new File("/home/iamhda/ETC/Room-Renting/backend/src/main/resources/static/MessageMedia/" + file.getOriginalFilename()));
            }
        }catch (Exception e){
            log.error("e: ", e);
            throw new RuntimeException("Upload images failed!");
        }
        return messageMediaRepo.saveAll(messageMediaList)
                .stream()
                .map(messageMedia -> modelMapper.map(messageMedia, MessageMediaDTO.class))
                .toList() ;
    }
}
