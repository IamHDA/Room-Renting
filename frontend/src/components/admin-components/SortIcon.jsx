import React, {useEffect, useState} from 'react';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faSortDown, faSortUp} from "@fortawesome/free-solid-svg-icons";

const SortIcon = ({sortValue, sortCondition, setSortCondition}) => {
    const [sortTime, setSortTime] = useState(0);

    useEffect(() => {
        if(!sortCondition.includes(sortValue)) setSortTime(0);
    }, [sortCondition])

    const handleSort = () => {
        const newSortTime = (sortTime + 1) % 3;
        setSortTime(newSortTime);
        let order = "";
        let query = sortValue;
        if(newSortTime === 1) order = "asc";
        if(newSortTime === 2) order = "desc";
        if(newSortTime === 0) {
            order = "";
            query = "";
        }
        setSortCondition(query + order);
    }

    return (
        <div style={{display: "inline-flex", flexDirection: "column", alignSelf: "center", position: "absolute", right: "10px"}} onClick={handleSort}>
            {(sortTime === 0 || sortTime === 1) && <FontAwesomeIcon icon={faSortUp} />}
            {(sortTime === 0 || sortTime === 2) && <FontAwesomeIcon icon={faSortDown} style={{marginTop: "-15px"}}/>}
        </div>
    );
};

export default SortIcon;