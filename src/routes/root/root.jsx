import React from "react";
import { Link } from "react-router-dom";
import { Items } from "../../components/itemsList/itemsList";
import style from './root.module.scss'
import { Header } from "../../components/header/header";
export const Root = () => {
  return (
    <div className={style.root}>
      <Header/>
      <Items />
      <div>
        <p> Приве здесь главная страница</p>
      </div>
    </div>
  );
};
