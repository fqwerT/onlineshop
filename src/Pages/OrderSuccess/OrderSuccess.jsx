import React from "react";
import { Header } from "../../components/Header/Header";
import style from "./Success.module.scss";
import img from "../../assets/imgs/delivery.png";
export const OrderSuccess = () => {
  return (
    <div>
      <Header />
      <div className={style.message__box}>
        <h1 className={style.message}>
          Congratulations the order has been placed successfully expect delivery
        </h1>

        <div>
          <img src={img} className={style.message__img} />
        </div>
      </div>
    </div>
  );
};
