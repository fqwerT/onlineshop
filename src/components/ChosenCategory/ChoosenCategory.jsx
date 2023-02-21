import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setCategoryItemReducer } from "../../store/categorySlice/categorySlice";
import { Header } from "../Header/Header";
export const ChoosenCategory = () => {
  const dispatch = useDispatch();
  const { category, categoryItems } = useSelector((state) => ({
    category: state.categorySlice.choosenCategory,
    categoryItems: state.categorySlice.categoryItems,
  }));
  const items = useSelector((state) => state.itemsSlice.items);
  console.log(category);
  const results = !category
    ? items.name
    : items.filter((item) => item.name.toLowerCase().includes(category));

  useEffect(() => {
    dispatch(setCategoryItemReducer(results));
  }, [category, items]);

  console.log(categoryItems);

  return (
    <div>
      <Header />
      <div>
        {categoryItems.map((item) => (
          <div>
            <img src={item.url} alt={item.name} />
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
