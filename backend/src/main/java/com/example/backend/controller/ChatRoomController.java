package com.example.backend.controller;

import com.example.backend.dto.chat.ChatRoomDTO;
import com.example.backend.dto.chat.ChatRoomPost;
import com.example.backend.service.ChatRoomService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/chatRoom")
public class ChatRoomController {

    @Autowired
    private ChatRoomService chatRoomService;

    @GetMapping("/chatRooms")
    public ResponseEntity<List<ChatRoomDTO>> getChatRooms(){
        return ResponseEntity.ok(chatRoomService.findBySender());
    }

    @PutMapping("/updateChatRoomPost/{chatId}")
    public ResponseEntity<String> updateChatRoomPost(@RequestBody ChatRoomPost chatRoomPost, @PathVariable String chatId){
        return ResponseEntity.ok(chatRoomService.updateChatRoomPost(chatRoomPost, chatId));
    }

    @PutMapping("/updateLastMessageStatus/{chatRoomId}")
    public ResponseEntity<String> updateLastMessageStatus(@PathVariable String chatRoomId){
        return ResponseEntity.ok(chatRoomService.updateLastMessageStatus(chatRoomId));
    }
}
