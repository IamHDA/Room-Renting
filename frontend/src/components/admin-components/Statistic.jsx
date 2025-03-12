import React, {useEffect} from 'react';
import '../../css/admin-css/Statistic.css'

const MyComponent = () => {

    useEffect(() => {
        const function1 = document.getElementById("function-1");
        if(function1){
            function1.classList.add("isSelected");
        }
    }, [])

    return (
        <div className="statistic-body">

        </div>
    );
};

export default MyComponent;
