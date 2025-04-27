import * as request from '../utils/request';

export const getCities = async () => {
    return await request.get('address/cities', {});
}

export const getDistrictsByCity = async (city) => {
    return await request.get('address/districts/' + city, {});
}

export const getWardsByDistrict = async (district) => {
    return await request.get('address/wards/' + district, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
        }
    });
}

export const getAvailableAddress = async (keyword, cityName) => {
    return await request.get('address/search', {
        params: {
            keyword, cityName
        }
    })
}

