import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setItemsReducer } from "../../store/items/itemsSlice";
import { Header } from "../../components/Header/Header";
import { setCategoryReducer } from "../../store/categorySlice/categorySlice";
import style from "./Categories.module.scss";
import { useNavigate } from "react-router-dom";

useNavigate;
export const Categories = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const items = useSelector((state) => state.itemsSlice.items);
  const [categories, setCategories] = useState([]);
  let arr = items.map((item) => item.name);
  let arr2 = items.map((item) => item.category_img);

  let arr3 = arr.reduce((result, item) => {
    return result.includes(item) ? result : [...result, item];
  }, []);

  let arr4 = arr2.reduce((result, item) => {
    return result.includes(item) ? result : [...result, item];
  }, []);

  const arr5 = arr3.map((item) => ({ name: item }));
  const arr6 = arr4.map((item) => ({ url: item }));

  const CategoriesArray = arr5.map((item, index) => ({
    ...item,
    ...arr6[index],
  }));

  useEffect(() => {
    setCategories(CategoriesArray);
  }, [items]);

  const SetCategory = (name) => {
    dispatch(setCategoryReducer(name.toLowerCase()));
    navigate("/ChoosenCatergory");
  };

  const { category } = useSelector((state) => ({
    category: state.categorySlice.choosenCategory,
  }));

  const  {categoryItems } = useSelector((state) => ({
    categoryItems: state.categorySlice.categoryItems,
  }));

  return (
    <div className={style.category}>
      <Header />
      <div className={style.category__container}>
        <div className={style.category__menu}>
          {categories.map((item) => (
            <div className={style.category__brandBox}>
              <img src={item.url} className={style.category__img} />
              <h1
                className={style.category__header}
                onClick={() => SetCategory(item.name)}
              >
                {item.name}
              </h1>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
};
