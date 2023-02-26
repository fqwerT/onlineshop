import React, { useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { setItemsReducer } from "../../store/items/itemsSlice";
import { setCartReducer } from "../../store/items/itemsSlice";
import { useSelector } from "react-redux";
import { setFillteredReducer } from "../../store/items/itemsSlice";
import { useNavigate } from "react-router-dom";
import { setCurrentReducer } from "../../store/items/itemsSlice";
import style from "./items.module.scss";
import { SupaBase__Link } from "../../service/supaBase";

export const Items = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cart, items, fillItems } = useSelector((state) => ({
    cart: state.itemsSlice.cart,
    items: state.itemsSlice.items,
    fillItems: state.itemsSlice.filteredItems,
  }));

  async function getItems() {
    const values = await SupaBase__Link.from("shoptest").select();
    dispatch(setItemsReducer(values.data));
  }
  useEffect(() => {
    getItems();
  }, []);

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

  const handleClick = useCallback((item) => {
    dispatch(setCartReducer(item));
  },[cart]);

  useEffect(()=>{
    removeDuplicates(cart);
  },[items,cart])

  const handleInfo = (item) => {
    dispatch(setCurrentReducer(item));
    navigate("/item");
  };

  return (
    <div className={style.itemlist}>
      <div className={style.itemlist__container}>
        {fillItems.map((item) => (
          <div className={style.itemlist__card}>
            <img
              src={item.url}
              alt={item.name}
              className={style.itemlist__img}
            />
            <h1 className={style.itemlist__name}>
              {item.name} / {item.model}
            </h1>
            <div
              onClick={() => handleClick(item)}
              className={style.itemlist__addtoCart}
            >
              <p>Add to cart</p>
            </div>
            <h1 className={style.itemlist__price}>{item.price} ₽</h1>
            <div
              onClick={() => handleInfo(item)}
              className={style.itemlist__info}
            >
              About
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
