package com.example.backend.service;


import com.example.backend.dto.AddressDTO;
import com.example.backend.entity.mySQL.Address;
import com.example.backend.entity.mySQL.City;
import com.example.backend.entity.mySQL.District;
import com.example.backend.entity.mySQL.Ward;

import java.util.List;

public interface AddressService {
    public List<City> getAllCities();
    public List<District> getDistrictByCity(int id);
    public List<Ward> getWardByDistrict(int id);
}
