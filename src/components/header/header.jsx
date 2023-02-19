import React from "react";
import { Link } from "react-router-dom";
import style from "./header.module.scss";
import { InputSearch } from "../inputSearch/input";
import img from "../../assets/imgs/shopping-cart.png";
import img2 from "../../assets/imgs/home.png";
export const Header = () => {
  return (
    <div className={style.header}>
      <div className={style.header__menu}>
        <Link to="/cart">
          <img className={style.header__cart} src={img} />
        </Link>
        <Link to="/">
          <img src={img2} className={style.header__home} />
        </Link>
      </div>
      <div>
        <inputSearch />
      </div>
    </div>
  );
};
