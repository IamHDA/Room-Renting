package com.example.backend.controller;

import com.example.backend.dto.chat.ChatRoomDTO;
import com.example.backend.dto.chat.MessageDTO;
import com.example.backend.dto.chat.SendMessage;
import com.example.backend.dto.user.UserHeader;
import com.example.backend.entity.mySQL.User;
import com.example.backend.security.JwtFilter;
import com.example.backend.security.JwtTokenProvider;
import com.example.backend.service.ChatRoomService;
import com.example.backend.service.MessageService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.Header;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/chat")
public class ChatController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private ChatRoomService chatRoomService;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private UserService userService;

    @MessageMapping("/chat")
    public void sendMessage(@Payload SendMessage incomingMessage) {
        MessageDTO savedMessage = messageService.sendMessage(incomingMessage);
        messagingTemplate.convertAndSendToUser(String.valueOf(incomingMessage.getRecipientId()), "queue/messages", savedMessage);
    }

    @GetMapping("/chatRoom/{recipientId}")
    public ResponseEntity<Optional<String>> getChatRoomId(@PathVariable long recipientId){
        User currentUser = userService.getCurrentUser();
        return ResponseEntity.ok(chatRoomService.getChatRoomId(currentUser.getId(), recipientId, false));
    }

    @GetMapping("/messages/{chatId}")
    public ResponseEntity<List<MessageDTO>> getChatMessages(@PathVariable String chatId){
        return ResponseEntity.ok(messageService.getMessagesByChatId(chatId));
    }

    @GetMapping("/chatRooms")
    public ResponseEntity<List<ChatRoomDTO>> getChatRooms(){
        return ResponseEntity.ok(chatRoomService.findBySender());
    }

    @GetMapping("/recipient/{userId}")
    public ResponseEntity<UserHeader> getRecipient(@PathVariable long userId){
        return ResponseEntity.ok(userService.getUserHeader(userId));
    }
}
