import React, {useEffect, useState} from 'react';
import '../../css/Pagination.css';
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Link, useLocation} from "react-router-dom";

const MyComponent = ({dataLength, setStartIndex, setEndIndex, currentIndex, pathName}) => {
    const [selectedIndex, setSelectedIndex] = useState(currentIndex);
    const location = useLocation();
    const query = location.search;

    useEffect(() => {
        if(!currentIndex) currentIndex = 1;
        setStartIndex((currentIndex - 1) * 5);
        setEndIndex(currentIndex * 5);
        setSelectedIndex(currentIndex - 1);
    }, [currentIndex]);

    const buildLink = (page) => {
        const path = page === 1 ? pathName : `${pathName}/${page}`;
        return {
            pathname: path,
            search: query
        };
    };

    return (
        <div className="pagination">
            <p>Tổng số: {dataLength}</p>
            {selectedIndex !== 0 &&(
                <Link to={buildLink(selectedIndex)} className="icon-bounding">
                    <FontAwesomeIcon icon={faArrowLeft} style={{fontSize: '20px'}} />
                </Link>
            )}
            {Array.from({length: Math.ceil(dataLength/5)}, (_, i) => (
                <Link to={buildLink(i + 1)} key={i} className={`page-index ${selectedIndex === i ? "active" : "disable"}`}>{i + 1}</Link>
            ))}
            {selectedIndex + 1 < Math.ceil(dataLength/5) && (
                <Link to={buildLink(selectedIndex + 2)} className="icon-bounding">
                    <FontAwesomeIcon icon={faArrowRight} style={{fontSize: '20px'}} />
                </Link>
            )}
        </div>
    );
};

export default MyComponent;
