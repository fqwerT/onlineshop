import React from "react";
import { Link } from "react-router-dom";
import { Items } from "../../components/ItemsList/ItemsList";
import style from "./MainPage.module.scss";
import { Header } from "../../components/Header/Header";
import { Filters } from "../../components/ItemFilters/ItemFilters";
export const MainPage = () => {
  return (
    <div className={style.MainPage}>
      <Header />
      <div className={style.MainPage__container}>
        <div className={style.MainPage__filterContainer}>
         <Filters/>
        </div>
        <Items />
      </div>
    </div>
  );
};
