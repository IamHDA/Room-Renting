package com.example.backend.controller;

import com.example.backend.dto.address.AddressSearch;
import com.example.backend.dto.address.CityDTO;
import com.example.backend.dto.address.DistrictDTO;
import com.example.backend.dto.address.WardDTO;
import com.example.backend.entity.mySQL.City;
import com.example.backend.entity.mySQL.District;
import com.example.backend.entity.mySQL.Ward;
import com.example.backend.service.AddressService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/address")
public class AddressController {

    @Autowired
    private AddressService addressService;

    @GetMapping("/wards/{id}")
    public ResponseEntity<List<WardDTO>> getWardsByDistrict(@PathVariable("id") int id){
        return ResponseEntity.ok(addressService.getWardByDistrict(id));
    }

    @GetMapping("/districts/{id}")
    public ResponseEntity<List<DistrictDTO>> getDistrictsByCity(@PathVariable("id") int id){
        return ResponseEntity.ok(addressService.getDistrictByCity(id));
    }

    @GetMapping("/cities")
    public ResponseEntity<List<CityDTO>> getCities(){
        return ResponseEntity.ok(addressService.getAllCities());
    }

    @GetMapping("/search")
    public ResponseEntity<List<AddressSearch>> getAvailableAddress(
            @RequestParam(name = "keyword", defaultValue = "") String keyword,
            @RequestParam(name = "cityName", defaultValue = "") String cityName
    ){
        return ResponseEntity.ok(addressService.getAvailableAddress(keyword, cityName));
    }
}
