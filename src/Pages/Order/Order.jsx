import React from "react";
import { UserInput } from "../../components/userInput/UserInput";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import style from "./Order.module.scss";
import { CreditCard } from "../../components/CreditCard/CreditCard";
import { Header } from "../../components/Header/Header";

import { UserAdress } from "../../components/UserAdress/UserAdress";

export const Order = () => {
  const { name, surName, valid } = useSelector((state) => ({
    name: state.clientSlice.name,
    surname: state.clientSlice.surname,
    valid: state.clientSlice.valid,
  }));
  ymaps.modules.require(['PlacemarkButton'])
  .spread(function (PlacemarkButton) {
    myMap.controls.add(new PlacemarkButton('Кликните, чтобы добавить метку'));
});
  return (
    <div className={style.order}>
      <Header/>
      {valid ? <CreditCard Name={name} SurName={surName}/> : (<div><UserInput /><UserAdress/></div>)}
    </div>
  );
};


// 