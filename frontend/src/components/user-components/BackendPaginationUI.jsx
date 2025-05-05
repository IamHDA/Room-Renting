import React, {useEffect} from 'react';
import "../../css/Pagination.css";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faArrowLeft, faArrowRight} from "@fortawesome/free-solid-svg-icons";

const MyComponent = ({totalLength, currentPage, updateSearchParams, deleteSearchParams, pageSize}) => {
    useEffect(() => {
        if(currentPage === 1) deleteSearchParams("pageNumber");
        console.log(currentPage);
    }, [currentPage])

    return (
        <div className="pagination">
            {currentPage !== 1 && (
                <button
                    className="icon-bounding"
                    onClick={() => {
                        {
                            updateSearchParams([{
                                param: "pageNumber",
                                value: currentPage - 1,
                            }])
                        }
                    }}
                >
                    <FontAwesomeIcon icon={faArrowLeft} style={{fontSize: '20px'}} />
                </button>
            )}
            {Array.from({length: Math.ceil(totalLength/pageSize)}, (_, i) => (
                <button
                    key={i}
                    className={`page-index ${currentPage === i + 1 ? "active" : "disable"}`}
                    onClick={() => {
                        if(currentPage !== null){
                            updateSearchParams([{
                                param: "pageNumber",
                                value: i + 1,
                            }])
                        }
                    }}
                >
                    {i + 1}
                </button>
            ))}
            {currentPage < Math.ceil(totalLength/pageSize) && (
                <button
                    className="icon-bounding"
                    onClick={() => updateSearchParams([{
                        param: "pageNumber",
                        value: currentPage + 1
                    }])}
                >
                    <FontAwesomeIcon icon={faArrowRight} style={{fontSize: '20px'}} />
                </button>
            )}
        </div>
    );
};

export default MyComponent;
