import React, {createContext, useEffect, useState} from 'react';
import * as addressService from "../apiServices/address.js";

const AddressContext = createContext();

export const AddressProvider = ({children}) => {
    const [allCities, setAllCities] = useState(null);
    const [allDistricts, setAllDistricts] = useState(null);
    const [allWards, setAllWards] = useState(null);

    useEffect(() => {
        const fetchCities = async () => {
            try{
                const response = await addressService.getCities();
                setAllCities(response);
            }catch(e){
                console.log(e);
            }
        }
        fetchCities();
    }, [])

    const fetchDistrictsByCity = async (cityId) => {
        const response = await addressService.getDistrictsByCity(cityId);
        setAllDistricts(response);
    }

    const fetchWardsByDistrict = async (districtId) => {
        const response = await addressService.getWardsByDistrict(districtId);
        setAllWards(response);
    }

    return (
        <AddressContext.Provider value={{allCities, allDistricts, allWards, setAllWards, setAllDistricts, fetchDistrictsByCity, fetchWardsByDistrict}}>
            {children}
        </AddressContext.Provider>
    );
};

export default AddressContext;
