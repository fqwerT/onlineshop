import React, { useState, useEffect, useCallback } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setFilterPriceCategory } from "../../store/categorySlice/categorySlice";
import { setFiltersPrice } from "../../store/categorySlice/categorySlice";
import { setRemoveFilterChanges } from "../../store/categorySlice/categorySlice";
export const CategoryFilter = () => {
  const dispatch = useDispatch();
  // const [currentPrice, setCurrentPrice] = useState(15000);
  const { filteredCategoriItems, categoryItems, price } = useSelector(
    (state) => ({
      filteredCategoriItems: state.categorySlice.filteredCategoriItems,
      categoryItems: state.categorySlice.categoryItems,
      price: state.categorySlice.fillteringPrice,
    })
  );
  const changePriceValue = (event) => {
    dispatch(setFiltersPrice(event.target.value));
  };
  useEffect(() => {
    dispatch(setFilterPriceCategory(price));
  }, [price, categoryItems]);

  const removeApply = useCallback(() => {
    dispatch(setRemoveFilterChanges());
  }, []);

  // <h1 onClick={removeApply}>Reset all</h1>
  console.log(filteredCategoriItems);
  console.log(price);
  return (
    <div>
      <h1>price up to : {price}₽</h1>
      <input
        type="range"
        onChange={changePriceValue}
        min={0}
        max={15000}
        step={1}
        value={[price]}
      ></input>
    </div>
  );
};
