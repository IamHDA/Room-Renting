package com.example.backend.controller;

import com.example.backend.dto.chat.MessageDTO;
import com.example.backend.dto.chat.MessageMediaDTO;
import com.example.backend.service.MessageMediaService;
import com.example.backend.service.MessageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/message")
public class MessageController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private MessageMediaService messageMediaService;

    @GetMapping("/messages/{chatId}")
    public ResponseEntity<List<MessageDTO>> getChatMessages(@PathVariable String chatId){
        return ResponseEntity.ok(messageService.getMessagesByChatId(chatId));
    }

    @PostMapping("/uploadMessageMedia")
    public ResponseEntity<List<MessageMediaDTO>> uploadMessageMedia(@RequestPart(name = "file") List<MultipartFile> files){
        return ResponseEntity.ok(messageMediaService.uploadMessageMedia(files));
    }
}
