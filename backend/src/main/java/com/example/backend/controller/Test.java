package com.example.backend.controller;

import com.example.backend.entity.mongoDB.Message;
import com.example.backend.entity.mySQL.City;
import com.example.backend.entity.mySQL.District;
import com.example.backend.entity.mySQL.User;
import com.example.backend.entity.mySQL.Ward;
import com.example.backend.repository.mongoDB.MessageRepository;
import com.example.backend.repository.mySQL.CityRepository;
import com.example.backend.repository.mySQL.DistrictRepository;
import com.example.backend.repository.mySQL.UserRepository;
import com.example.backend.repository.mySQL.WardRepository;
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

    @GetMapping("/image")
    public ResponseEntity<String> test(@RequestParam(name = "media") MultipartFile file) throws IOException {
        return ResponseEntity.ok(file.getContentType().split("/")[0].toUpperCase());
    }
//    @PostMapping("/city")
//    public void addCities(@RequestBody List<City> cities) {
//        cityRepo.saveAll(cities);
//    }
//
//    @PostMapping("/district")
//    public void addDistricts(@RequestBody List<District> districts) {
//        List<District> districtList = districts.stream()
//                .map(tmp -> {
//                    City city = cityRepo.findById(tmp.getCity().getId())
//                            .orElseThrow(() -> new RuntimeException("Không tìm thấy City với ID: " + tmp.getCity().getId()));
//                    District district = new District();
//                    district.setCity(city);
//                    district.setName(tmp.getName());
//                    return district;
//                })
//                .collect(Collectors.toList());
//
//        districtRepo.saveAll(districtList);
//    }
//
//    @PostMapping("/ward")
//    public void addWards(@RequestBody List<Ward> wards) {
//        List<Ward> wardList = wards.stream()
//                .map(tmp -> {
//                    District district = districtRepo.findById(tmp.getDistrict().getId())
//                            .orElseThrow(RuntimeException::new);
//                    Ward ward = new Ward();
//                    ward.setDistrict(district);
//                    ward.setName(tmp.getName());
//                    return ward;
//                })
//                .collect(Collectors.toList());
//        wardRepo.saveAll(wardList);
//    }
}
