import React from "react";
import itemsSlice from "../../store/items/itemsSlice";
import { Link } from "react-router-dom";
import style from "./CurrentItem.module.scss";
import { Header } from "../Header/Header";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCartReducer } from "../../store/items/itemsSlice";
import { setFillteredReducer } from "../../store/items/itemsSlice";
export const CurrentItem = () => {
  const current = useSelector((state) => state.itemsSlice.currentItem);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.itemsSlice.cart);

  const removeDuplicates = (arr) => {
    const result = [];
    const duplicatesIndices = [];
    arr.forEach((current, index) => {
      if (duplicatesIndices.includes(index)) return;
      result.push(current);
      for (
        let comparisonIndex = index + 1;
        comparisonIndex < arr.length;
        comparisonIndex++
      ) {
        const comparison = arr[comparisonIndex];
        const currentKeys = Object.keys(current);
        const comparisonKeys = Object.keys(comparison);
        if (currentKeys.length !== comparisonKeys.length) continue;
        const currentKeysString = currentKeys.sort().join("").toLowerCase();
        const comparisonKeysString = comparisonKeys
          .sort()
          .join("")
          .toLowerCase();
        if (currentKeysString !== comparisonKeysString) continue;
        let valuesEqual = true;
        for (let i = 0; i < currentKeys.length; i++) {
          const key = currentKeys[i];
          if (current[key] !== comparison[key]) {
            valuesEqual = false;
            break;
          }
        }
        if (valuesEqual) duplicatesIndices.push(comparisonIndex);
      }
    });
    return dispatch(setFillteredReducer(result));
  };
  const handleClick = (item) => {
    dispatch(setCartReducer(item));
    removeDuplicates(cart);
  };
  return (
    <div className={style.itemPage}>
      <Header />
      <div className={style.itemPage__container}>
        <div className={style.itemPage__card__mainInfo}>
          <img
            src={current.url}
            alt={current.name}
            className={style.itemPage__img}
          />
          <div className={style.itemPage__card__text}>
            <h1 className={style.itemPage__card__name}>
              {current.name} / {current.model}
            </h1>
            <div className={style.itemPage__addInfo}>
              <h1>price: {current.price} ₽</h1>
              <h1>size: {current.size}</h1>
              <h1>matherial: {current.matherial}</h1>
            </div>
            <div
              onClick={() => handleClick(current)}
              className={style.itemPage__addtoCart}
            >
              <p>Add to cart</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
