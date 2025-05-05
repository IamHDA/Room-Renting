import React, {useEffect, useState} from 'react';
import '../../css/Pagination.css';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";

const MyComponent = ({dataLength, setStartIndex, setEndIndex, storageName, currentPageIndex}) => {
    const [selectedIndex, setSelectedIndex] = useState(currentPageIndex);

    useEffect(() => {
        console.log(selectedIndex);
        setStartIndex(selectedIndex * 4);
        setEndIndex((selectedIndex + 1) * 4);
        localStorage.setItem(storageName, JSON.stringify(selectedIndex));
    }, [selectedIndex]);

    return (
        <div className="pagination">
            <p>Tổng số: {dataLength}</p>
            {selectedIndex !== 0 &&(
                <button className="icon-bounding" onClick={() => setSelectedIndex(prev => prev - 1)}>
                    <FontAwesomeIcon icon={faArrowLeft} style={{fontSize: '20px'}} />
                </button>
            )}
            {Array.from({length: Math.ceil(dataLength/4)}, (_, i) => (
                <button key={i} className={`page-index ${selectedIndex === i ? "active" : "disable"}`} onClick={() => setSelectedIndex(i)}>{i + 1}</button>
            ))}
            {selectedIndex + 1 < Math.ceil(dataLength/4) && (
                <button className="icon-bounding" onClick={() => setSelectedIndex(prev => prev + 1)}>
                    <FontAwesomeIcon icon={faArrowRight} style={{fontSize: '20px'}} />
                </button>
            )}
        </div>
    );
};

export default MyComponent;
