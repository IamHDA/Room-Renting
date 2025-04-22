package com.example.backend.service;

import com.example.backend.dto.chat.MessageDTO;
import com.example.backend.dto.chat.SendMessage;

import java.util.List;

public interface MessageService {
    List<MessageDTO> getMessagesByChatId(String chatId);
    MessageDTO sendMessage(SendMessage messageDTO);
//    void uploadMessageImage(List<String> base64Files, String messageId) throws IOException;
}
