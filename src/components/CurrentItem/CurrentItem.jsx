import React, { useRef } from "react";
import style from "./CurrentItem.module.scss";
import { Header } from "../Header/Header";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setCartReducer } from "../../store/items/itemsSlice";
import { setFillteredReducer } from "../../store/items/itemsSlice";
import YouTube from "react-youtube";
import { YouTubeOptions } from "../../service/youTubeOptions";
export const CurrentItem = () => {
  
  const current = useSelector((state) => state.itemsSlice.currentItem);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.itemsSlice.cart);
  const ref = useRef(null);
  const ref2 = useRef(null);
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

  const handleShowPlayer = () => {
    const elem = ref.current;
    ref.current.classList.toggle(`${style.itemPage__show}`);
    ref2.current.classList.toggle(`${style.itemPage__active}`);
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
        <div onClick={handleShowPlayer} className={style.itemPage__btnContainer}>
          <h1 className={style.itemPage__btnText} >Show youtube review</h1>
        </div>
      </div>
      <div className={style.itemPage__player} ref={ref}>
        <div>
          <h1 className={style.itemPage__playerHeader} ref={ref2}>
            watch the review on youtube
          </h1>
        </div>
        <YouTube videoId={`${current.youTube_id}`} opts={YouTubeOptions} />
      </div>
    </div>
  );
};
