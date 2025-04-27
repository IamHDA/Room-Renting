package com.example.backend.service.implement;

import com.example.backend.dto.address.AddressSearch;
import com.example.backend.dto.address.CityDTO;
import com.example.backend.dto.address.DistrictDTO;
import com.example.backend.dto.address.WardDTO;
import com.example.backend.entity.mySQL.City;
import com.example.backend.entity.mySQL.District;
import com.example.backend.entity.mySQL.Ward;
import com.example.backend.repository.mySQL.*;
import com.example.backend.service.AddressService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImp implements AddressService {

    @Autowired
    private WardRepository wardRepo;
    @Autowired
    private DistrictRepository districtRepo;
    @Autowired
    private CityRepository cityRepo;
    @Autowired
    private ModelMapper modelMapper;
    @Autowired
    private FilterRepository filterRepo;

    @Override
    public List<CityDTO> getAllCities() {
        return cityRepo.findAll()
                .stream()
                .map(city -> modelMapper.map(city, CityDTO.class))
                .toList();
    }

    @Override
    public List<DistrictDTO> getDistrictByCity(int id) {
        return districtRepo.findByCity_Id(id)
                .stream()
                .map(district -> modelMapper.map(district, DistrictDTO.class))
                .toList();
    }

    @Override
    public List<WardDTO> getWardByDistrict(int id) {
        return wardRepo.findByDistrict_Id(id)
                .stream()
                .map(ward -> modelMapper.map(ward, WardDTO.class))
                .toList();
    }

    @Override
    public List<AddressSearch> getAvailableAddress(String keyword, String cityName) {
        return filterRepo.searchAddress(keyword, cityName)
                .stream()
                .map(ward -> {
                    District district = ward.getDistrict();
                    City city = district.getCity();
                    return AddressSearch.builder()
                                .wardName(ward.getName())
                                .districtName(district.getName())
                                .cityName(city.getName())
                            .build();
                })
                .toList();
    }
}
