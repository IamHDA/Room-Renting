package com.example.backend.controller;

import com.example.backend.entity.mongoDB.Message;
import com.example.backend.entity.mySQL.*;
import com.example.backend.repository.mongoDB.MessageRepository;
import com.example.backend.repository.mySQL.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.InputStreamResource;
import org.springframework.core.io.Resource;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/test")
public class Test {

    @Autowired
    private UserRepository userRepo;
    @Autowired
    private AccountRepository accountRepo;

    @GetMapping("/image")
    public ResponseEntity<String> test(@RequestParam(name = "media") MultipartFile file) throws IOException {
        return ResponseEntity.ok(file.getContentType().split("/")[0].toUpperCase());
    }
}
