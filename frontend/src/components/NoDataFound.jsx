import React from 'react';

const NoDataFound = () => {
    return (
        <React.Fragment>
            <img src="../../../public/no-data.png" alt="No data" style={{width: "80px", height: "80px", opacity: 0.5}} />
            <p style={{marginTop: "10px", color: "#888"}}>Không có dữ liệu</p>
        </React.Fragment>
    );
};

export default NoDataFound;