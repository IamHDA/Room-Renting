package com.example.backend.service;

import com.example.backend.dto.chat.MessageDTO;
import com.example.backend.dto.chat.SendMessage;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface MessageService {
    List<MessageDTO> getMessagesByChatId(String chatId);
    MessageDTO sendMessage(SendMessage messageDTO);

    String deleteMessage(String messageId);
}
