import React, { useCallback } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./Cart.module.scss";
import { Header } from "../../components/Header/Header";
import { setRemoveCartItem } from "../../store/items/itemsSlice";
import { useDispatch } from "react-redux";

export const Cart = () => {
  const Cart = useSelector((state) => state.itemsSlice.fillterCart);
  const dispatch = useDispatch();

  const handleRemove = (id) => {
    dispatch(setRemoveCartItem(id));
  };

  return (
    <div className={style.cart}>
      <Header />
      <div className={style.cart__orderProducts}>
        {Cart.length == 0 ? (
          <div>Корзина пока пуста...</div>
        ) : (
          <div>
            {Cart.length !== 0 && <Link to="/Order"  className={style.cart__btn}>Order now</Link> }
            {Cart.map((item) => (
              <div className={style.cart__box} key={item.id}>
                <div className={style.cart__info} key={item.id}>
                  <img
                    src={item.url}
                    alt={item.name}
                    className={style.cart__img}
                  />
                  <div className={style.cart__additionally} >
                    <h1>
                      {item.name} / {item.model}
                    </h1>
                    <h1>{item.color}</h1>
                  </div>
                </div>
                <button onClick={() => handleRemove(item.id)}>
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

// <Link to="/order">order</Link>
