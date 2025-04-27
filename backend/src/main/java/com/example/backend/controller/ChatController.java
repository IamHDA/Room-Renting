package com.example.backend.controller;

import com.example.backend.dto.chat.*;
import com.example.backend.dto.user.UserHeader;
import com.example.backend.service.ChatRoomService;
import com.example.backend.service.MessageMediaService;
import com.example.backend.service.MessageService;
import com.example.backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/chat")
public class ChatController {
    @Autowired
    private MessageService messageService;
    @Autowired
    private SimpMessagingTemplate messagingTemplate;
    @Autowired
    private UserService userService;

    @MessageMapping("/chat")
    public void sendMessage(@Payload SendMessage incomingMessage) {
        MessageDTO savedMessage = messageService.sendMessage(incomingMessage);
        messagingTemplate.convertAndSendToUser(String.valueOf(incomingMessage.getRecipientId()), "/queue/messages", savedMessage);
    }

    @MessageMapping("/user.connect")
    @SendTo("/topic/public")
    public String connect(@Payload long connectedUserId){
        return "connect " + connectedUserId;
    }

    @MessageMapping("/user.disconnect")
    @SendTo("/topic/public")
    public String disconnect(@Payload long disconnectedUserId){
        return "disconnect " + disconnectedUserId;
    }

    @MessageMapping("/message.revoke")
    public void message(@Payload RevokeRequest revokeRequest){
        messagingTemplate.convertAndSend("/topic/chat/" + revokeRequest.getChatId(), revokeRequest.getChatId());
    }

    @GetMapping("/recipient/{userId}")
    public ResponseEntity<UserHeader> getRecipient(@PathVariable long userId){
        return ResponseEntity.ok(userService.getUserHeader(userId));
    }
}
