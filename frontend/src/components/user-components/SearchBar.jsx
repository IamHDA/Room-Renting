import React, {useEffect, useRef, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faLocationDot, faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {useNavigate} from "react-router-dom";

const SearchBar = ({setAddressesDropdown, addressesDropdown, searchResult, showAddress, setSearch, searchParamRef, search}) => {
    const dropDownRef = useRef(null);
    const [customChoice, setCustomChoice] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropDownRef.current && !dropDownRef.current.contains(event.target)) {
                setAddressesDropdown(false);
            }
        };

        if (addressesDropdown) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [addressesDropdown]);

    const handleSearch = () => {
        if(customChoice && search !== ("")) {
            searchParamRef.current.set("keyword", search);
        }
        navigate(`/list?${searchParamRef.current.toString()}`);
    }

    return (
        <React.Fragment>
            <div className="search">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="search-icon"/>
                <input
                    className="search-input"
                    type="text"
                    placeholder="Nhập địa điểm. Ví dụ: Đại Kim, Hoàng Mai"
                    value={search}
                    onKeyDown={(e) => {
                        if(e.key === "Enter") handleSearch();
                    }}
                    onClick={() => setAddressesDropdown(true)}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCustomChoice(true);
                    }}
                />
                {addressesDropdown && (
                    <div
                        ref={dropDownRef}
                        style={{
                            position: "absolute",
                            top: "90%",
                            left: "0",
                            right: "0",
                            display: "flex",
                            flexDirection: "column",
                            padding: "20px",
                            maxHeight: "200px",
                            overflowY: "auto",
                            zIndex: "100",
                            backgroundColor: "white",
                            borderBottomRightRadius: "10px",
                            borderBottomLeftRadius: "10px",
                        }}
                    >
                        {searchResult.map((address, index) => (
                            <div
                                key={index}
                                className="address-choice"
                            >
                                <FontAwesomeIcon icon={faLocationDot} />
                                <p onClick={() => {
                                    searchParamRef.current.set("ward", address.wardName);
                                    searchParamRef.current.set("district", address.districtName);
                                    searchParamRef.current.set("city", address.cityName);
                                    setCustomChoice(false);
                                    setAddressesDropdown(false);
                                    setSearch(showAddress(address));
                                }}
                                >
                                    {showAddress(address)}
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
            <div
                className="search-button"
                onClick={handleSearch}
            >
                Tìm kiếm
            </div>
        </React.Fragment>
    );
};

export default SearchBar;