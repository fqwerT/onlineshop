import React from "react";
import { Link } from "react-router-dom";
import { Items } from "../../components/ItemsList/ItemsList";
import style from './MainPage.module.scss'
import { Header } from "../../components/Header/Header";
export const MainPage = () => {
  return (
    <div className={style.root}>
      <Header/>
      <Items />
    </div>
  );
};
