import React, {useState} from 'react';
import {Link} from "react-router-dom";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faX} from "@fortawesome/free-solid-svg-icons";
import {priceFormat} from "../utils/format.js";
import Pagination from "../components/user-components/PagePagination.jsx";

const MyComponent = ({posts, removePostFromFavourite, stIndex, edIndex}) => {
    const [startIndex, setStartIndex] = useState(stIndex);
    const [endIndex, setEndIndex] = useState(edIndex);

    return (
        <>

        </>
    );
};

export default MyComponent;
