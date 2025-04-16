import * as request from '../utils/request';

export const getCities = async () => {
    return await request.get('address/cities', {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
        }
    });
}

export const getDistrictsByCity = async (city) => {
    return await request.get('address/districts/' + city, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
        }
    });
}

export const getWardsByDistrict = async (district) => {
    return await request.get('address/wards/' + district, {
        headers: {
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
        }
    });
}

