package com.example.backend.repository.mongoDB;

import org.springframework.data.domain.Sort;
import com.example.backend.entity.mongoDB.ChatRoom;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ChatRoomRepository extends MongoRepository<ChatRoom, String> {
    Optional<ChatRoom> findBySenderIdAndRecipientId(long senderId, long recipientId);
    List<ChatRoom> findByChatId(String chatId);
    List<ChatRoom> findBySenderId(long id, Sort sort);
    List<ChatRoom> findByRecipientNameContainingAndSenderId(String keyword, long id, Sort sort);
    @Query(value = "{ 'lastMessage.senderId' : ?0, 'senderId' : ?0 }", count = true)
    int countByLastMessageSenderId(long id);
    int countBySenderId(long userId);
    void deleteAllByIdIn(List<String> idList);
}
