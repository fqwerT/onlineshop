import React, { useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
import { useDispatch } from "react-redux";
import { setItemsReducer } from "../../store/items/itemsSlice";
import { setCartReducer } from "../../store/items/itemsSlice";
import { useSelector } from "react-redux";
import { setFillteredReducer } from "../../store/items/itemsSlice";
import { useNavigate } from "react-router-dom";
import { setCurrentReducer } from "../../store/items/itemsSlice";
import style from "./items.module.scss";

export const Items = () => {
  const cart = useSelector((state) => state.itemsSlice.cart);
  const items = useSelector((state) => state.itemsSlice.items);
  const fillterCart = useSelector((state) => state.itemsSlice.fillterCart);
  const current = useSelector((state) => state.itemsSlice.currentItem);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const supabase = createClient(
    "https://vlkqvnmhxlmmehqfnmrm.supabase.co",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZsa3F2bm1oeGxtbWVocWZubXJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzY2MzAwMzgsImV4cCI6MTk5MjIwNjAzOH0.f78nrRWPi3c-Fi8qyJk7g1KaAZZRg-sq4ceyW-i91pU"
  );
  async function getItems() {
    const values = await supabase.from("shoptest").select();
    dispatch(setItemsReducer(values.data));
  }

  getItems();

  function removeDuplicates(arr) {
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
  }

  const handleClick = (item) => {
    dispatch(setCartReducer(item));
    removeDuplicates(cart);
  };

  const handleInfo = (item) => {
    dispatch(setCurrentReducer(item));
    navigate("/item");
    console.log(current);
  };
  return (
    <div className={style.itemlist}>
      <div className={style.itemlist__container}>
        {items.map((item) => (
          <div className={style.itemlist__card}>
           
            <img
              src={item.url}
              alt={item.name}
              className={style.itemlist__img}
            />
             <h1 className={style.itemlist__name}>
              {item.name} / {item.model}
            </h1>
            <h1 className={style.itemlist__price} >{item.price} ₽</h1>
            <div
              onClick={() => handleClick(item)}
              className={style.itemlist__addtoCart}
            ><p>добавить в корзину</p>
            </div>
            <div onClick={() => handleInfo(item)} className={style.itemlist__info} >Подробнее</div>
          </div>
        ))}
      </div>
    </div>
  );
};
