import React from 'react';
import '../css/Pagination.css';
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faAngleRight} from "@fortawesome/free-solid-svg-icons";

const MyComponent = () => {
    return (
        <div className="pagination">
            <p>Tổng số: n</p>
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button><FontAwesomeIcon icon={faAngleRight}/></button>
        </div>
    );
};

export default MyComponent;
