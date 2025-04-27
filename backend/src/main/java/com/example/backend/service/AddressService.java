package com.example.backend.service;


import com.example.backend.dto.address.AddressSearch;
import com.example.backend.dto.address.CityDTO;
import com.example.backend.dto.address.DistrictDTO;
import com.example.backend.dto.address.WardDTO;

import java.util.List;

public interface AddressService {
    List<CityDTO> getAllCities();
    List<DistrictDTO> getDistrictByCity(int id);
    List<WardDTO> getWardByDistrict(int id);
    List<AddressSearch> getAvailableAddress(String keyword, String cityName);
}
