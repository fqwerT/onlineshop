import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setItemsPriceReducer } from "../../store/items/itemsSlice";
import { setFilteredPrice } from "../../store/items/itemsSlice";
import { setChangeItems } from "../../store/items/itemsSlice";
import { setFilteredColor } from "../../store/items/itemsSlice";
import { setRemoveDuplicates } from "../../store/items/itemsSlice";
import { setColorsReducer } from "../../store/items/itemsSlice";
import style from "./itemFilter.module.scss";
export const Filters = () => {
  const dispatch = useDispatch();
  const [filteredPrice, setFilterdPrice] = useState([]);
  const [activeFillter, setActiveFillter] = useState(false);
  const { items, price, filtered, colors } = useSelector((state) => ({
    items: state.itemsSlice.items,
    price: state.itemsSlice.itemsPrice,
    filtered: state.itemsSlice.filteredItems,
    colors: state.itemsSlice.colors,
  }));
  const [firstItem] = price.slice(0);
  const [currentPrice, setCurrentPrice] = useState([firstItem]);
  const arrPrice = items.map((item) => item.price);
  const newPriceArr = arrPrice.sort(function (a, b) {
    return a - b;
  });

  const changePriceValue = (event) => {
    setCurrentPrice(event.target.value);
    console.log(event.target.value);
  };

  useEffect(() => {
    dispatch(setItemsPriceReducer(newPriceArr));
    dispatch(setColorsReducer());
    dispatch(setRemoveDuplicates());
  }, [items, filtered]);

  const handleApplyPrice = useCallback(() => {
    dispatch(setFilteredPrice(currentPrice));
    setActiveFillter(true);
  }, [currentPrice]);

  const removeApply = useCallback(() => {
    dispatch(setChangeItems());
    setActiveFillter(false);
  }, [currentPrice]);

  const handleApplyColor = useCallback(
    (item) => {
      dispatch(setFilteredColor(item));
      setActiveFillter(true);
    },
    [currentPrice]
  );

  return (
    <div className={style.fillters}>
      <div className={style.fillters__price}>
        <h1 className={style.fillters__header}>
          price up to : {currentPrice}₽
        </h1>
        <input
          type="range"
          onChange={changePriceValue}
          min={0}
          max={15000}
          step={1}
          value={[currentPrice]}
        ></input>
        <h1 onClick={handleApplyPrice} className={style.fillters__btn}>
          Apply
        </h1>
        {activeFillter && (
          <h1 onClick={removeApply} className={style.fillters__btn}>
            remove{" "}
          </h1>
        )}
      </div>
      <div className={style.fillters__color}>
        <h1 className={style.fillters__header}>color</h1>
        {colors.map((item) => (
          <h1
            className={style.fillters__color__btn}
            onClick={() => handleApplyColor(item)}
          >
            {item}
          </h1>
        ))}
        <h1 onClick={removeApply} className={style.fillters__btn}>
          remove{" "}
        </h1>
      </div>

      <div className={style.fillters__toCategory__btn}>
        <Link className={style.fillters__toCategory__link} to="/catergories">
          brand
        </Link>
      </div>
    </div>
  );
};
