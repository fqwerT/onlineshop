import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCategoryItemReducer } from "../../store/categorySlice/categorySlice";
import { Header } from "../Header/Header";
import { CategoryFilter } from "../CategoryPriceFillter/CategoryPriceFillter";
import style from "./ChoosenCategory.module.scss";

export const ChoosenCategory = () => {
  const dispatch = useDispatch();
  const { category, categoryItems, filteredCategoriItems, price } = useSelector(
    (state) => ({
      category: state.categorySlice.choosenCategory,
      categoryItems: state.categorySlice.categoryItems,
      filteredCategoriItems: state.categorySlice.filteredCategoriItems,
      price: state.categorySlice.fillteringPrice,
    })
  );
  const items = useSelector((state) => state.itemsSlice.items);

  console.log(category);
  const results = !category
    ? items.name
    : items.filter((item) => item.name.toLowerCase().includes(category));

  useEffect(() => {
    dispatch(setCategoryItemReducer(results));
  }, [category, items]);

  return (
    <div className={style.Choosen}>
      <Header />
      <div className={style.Choosen__container}>
        <CategoryFilter />
        {filteredCategoriItems.length !== 0 &&
          filteredCategoriItems.map((item) => (
            <div>
              <img
                src={item.url}
                alt={item.name}
                className={style.Choosen__img}
              />
              <h1>
                {item.name} / {item.model}
              </h1>
              <div>
                <p>Add to cart</p>
              </div>
              <h1>{item.price} ₽</h1>
              <div>About</div>
            </div>
          ))}
      </div>
    </div>
  );
};
