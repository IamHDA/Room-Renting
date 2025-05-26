import * as request from '../utils/request';

export const getCities = async () => {
    return await request.get('address/cities', {});
}

export const getDistrictsByCity = async (cityId) => {
    return await request.get('address/districts/' + cityId, {});
}

export const getWardsByDistrict = async (districtId) => {
    return await request.get('address/wards/' + districtId, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
        }
    });
}

export const searchAddress = async (keyword, cityName) => {
    return await request.get('address/search', {
        params: {
            keyword, cityName
        }
    })
}

