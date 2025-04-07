import * as request from '../utils/request';

export const getCities = async () => {
    const response = await request.get('address/cities',{
        headers:{
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
        }
    });
    return response;
}

export const getDistrictsByCity = async (city) => {
    const response = await request.get('address/districts/' + city,{
        headers:{
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
        }
    });
    return response;
}

export const getWardsByDistrict = async (district) => {
    const response = await request.get('address/wards/' + district,{
        headers:{
            Authorization: "Bearer " + localStorage.getItem("accessToken"),
        }
    });
    return response;
}

