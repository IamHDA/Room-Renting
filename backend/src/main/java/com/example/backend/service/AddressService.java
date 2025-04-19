package com.example.backend.service;


import com.example.backend.dto.AddressDTO;
import com.example.backend.entity.mySQL.Address;
import com.example.backend.entity.mySQL.City;
import com.example.backend.entity.mySQL.District;
import com.example.backend.entity.mySQL.Ward;

import java.util.List;

public interface AddressService {
    List<City> getAllCities();
    List<District> getDistrictByCity(int id);
    List<Ward> getWardByDistrict(int id);
    String getAddress(Address address);
    List<String> getAvailableAddress(String keyword);
}
