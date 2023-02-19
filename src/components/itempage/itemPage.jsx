import React from "react";
import { useSelector } from "react-redux";
import itemsSlice from "../../store/items/itemsSlice";
import { Link } from "react-router-dom";
import style from './item.module.scss'
export const CurrentItem = () => {
  const current = useSelector((state) => state.itemsSlice.currentItem);
  return (
    <div className={style.itemPage}>
      <div>
        <h1>
          {current.name} / {current.model}
        </h1>
        <img src={current.url} alt={current.name} className={style.itemPage__img} />
        <h1>{current.price} ₽</h1>
      </div>
      <Link to="/">go Back</Link>
    </div>
  );
};
