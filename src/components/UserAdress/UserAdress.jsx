import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";


export const UserAdress = props => {


    
    window.ymaps.ready(init);
        function init(){
            var myMap = new ymaps.Map("map", {
                center: [55.76, 37.64],
                zoom: 7
            });
        }

    ymaps.ready(init);
    return(
        <div>
            <div id='map'>
           
            </div>
        </div>
    )
}


