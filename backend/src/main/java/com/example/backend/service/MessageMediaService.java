package com.example.backend.service;

import com.example.backend.dto.chat.MessageMediaDTO;
import com.example.backend.entity.mongoDB.MessageMedia;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MessageMediaService {
    List<MessageMediaDTO> uploadMessageMedia(List<MultipartFile> files);
    void deleteMessageMedias(List<MessageMedia> messageMediaList);
}
