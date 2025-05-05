import React, {useEffect, useRef, useState} from 'react';
import {faMagnifyingGlass} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import "../../css/admin-css/SearchPopUp.css";

const SearchIcon = ({item, setParam, setCurrentPage}) => {
    const [showPopup, setShowPopup] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const popupRef = useRef(null);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (popupRef.current && !popupRef.current.contains(event.target)) {
                setShowPopup(false);
            }
        };

        if (showPopup) {
            document.addEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showPopup]);

    const handleSearch = async () => {
        if(searchInput === "Đang hiển thị"){
            setParam("ENABLED");
        }else if(searchInput === "Đã ẩn"){
            setParam("DISABLED");
        }else{
            setParam(searchInput);
        }
        setShowPopup(false);
        setCurrentPage(1);
    }

    return (
        <div>
            <FontAwesomeIcon
                icon={faMagnifyingGlass}
                style={{position: "absolute", right: "10px", top: "50%", transform: "translateY(-50%"}}
                onClick={() => setShowPopup(!showPopup)}
            />
            {showPopup &&
                <div className="search-popup" ref={popupRef}>
                    <div style={{display: "flex", justifyContent: "end"}}>
                        <input
                            type="text"
                            placeholder={`Tìm ${item}`}
                            value={searchInput}
                            style={{
                                outline: "none",
                                fontSize: "18px",
                                width: "146px"
                            }}
                            onChange={(e) => setSearchInput(e.target.value)}
                        />
                        <button
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: "40x",
                                height: "40px",
                                border: "none",
                                backgroundColor: "#008CFF",
                                cursor: "pointer",
                                borderTopRightRadius: "5px",
                                borderBottomRightRadius: "5px",
                            }} onClick={handleSearch}
                        >
                            <FontAwesomeIcon
                                icon={faMagnifyingGlass}
                                style={{color: "white"}}
                            />
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};

export default SearchIcon;