package com.example.backend.dto.address;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class AddressSearch {
    private String detail;
    private String wardName;
    private String districtName;
    private String cityName;
}
