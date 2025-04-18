package com.example.backend.service.implement;

import com.example.backend.dto.AddressDTO;
import com.example.backend.entity.mySQL.Address;
import com.example.backend.entity.mySQL.City;
import com.example.backend.entity.mySQL.District;
import com.example.backend.entity.mySQL.Ward;
import com.example.backend.repository.mySQL.AddressRepository;
import com.example.backend.repository.mySQL.CityRepository;
import com.example.backend.repository.mySQL.DistrictRepository;
import com.example.backend.repository.mySQL.WardRepository;
import com.example.backend.service.AddressService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AddressServiceImplement implements AddressService {

    @Autowired
    private WardRepository wardRepo;
    @Autowired
    private DistrictRepository districtRepo;
    @Autowired
    private CityRepository cityRepo;

    @Override
    public List<City> getAllCities() {
        return cityRepo.findAll();
    }

    @Override
    public List<District> getDistrictByCity(int id) {
        List<District> districts = districtRepo.findByCity_Id(id);
        return districts;
    }

    @Override
    public List<Ward> getWardByDistrict(int id) {
        List<Ward> wards = wardRepo.findByDistrict_Id(id);
        return wards;
    }

    @Override
    public String getAddress(Address address) {
        if(address == null) return "";
        String addressDetail = address.getDetail();
        Ward addressWard = address.getWard();
        District addressDistrict = addressWard.getDistrict();
        City addressCity = addressDistrict.getCity();
        return (addressDetail.isBlank() ? "" : (addressDetail + ", ")) + addressWard.getName() + ", " + addressDistrict.getName() + ", " + addressCity.getName();
    }
}
