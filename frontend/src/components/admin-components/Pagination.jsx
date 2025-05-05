import React from 'react';
import '../../css/Pagination.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";

const MyComponent = ({currentPage, setCurrentPage, totalLength, pageSize, setPageSize}) => {
    return (
        <div className="pagination">
            <p>Tổng số: {totalLength}</p>
            {currentPage !== 1 && (
                <button className="icon-bounding" onClick={() => setCurrentPage(prev => prev - 1)}>
                    <FontAwesomeIcon icon={faArrowLeft} style={{fontSize: '20px'}} />
                </button>
            )}
            {Array.from({length: Math.ceil(totalLength/pageSize)}, (_, i) => (
                <button key={i} className={`page-index ${currentPage - 1 === i ? "active" : "disable"}`} onClick={() => setCurrentPage(i + 1)}>{i + 1}</button>
            ))}
            {currentPage < Math.ceil(totalLength/pageSize) && (
                <button className="icon-bounding" onClick={() => setCurrentPage(prev => prev + 1)}>
                    <FontAwesomeIcon icon={faArrowRight} style={{fontSize: '20px'}} />
                </button>
            )}
            <select
                style={{height: '37px', width: '100px', fontSize: '18px', border: "2px solid gray", borderRadius: "5px"}}
                onChange={(e) => setPageSize(e.target.value)}
            >
                <option value={5}>5 / trang</option>
                <option value={10}>10 / trang</option>
                <option value={15}>15 / trang</option>
                <option value={20}>20 / trang</option>
            </select>
        </div>
    );
};

export default MyComponent;
