import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import style from "./Cart.module.scss";
import { Header } from "../../components/Header/Header";
import { useDispatch } from "react-redux";
import { setIncrementReducer } from "../../store/items/itemsSlice";
import { setDecrementReducer } from "../../store/items/itemsSlice";
export const Cart = () => {
  const dispatch = useDispatch();
  const Cart = useSelector((state) => state.itemsSlice.fillterCart);
  const [finPrice, setFinPrice] = useState(1);
  const quantity = useSelector((state) => state.itemsSlice.quantity);

  const handleIncrement = (price) => {
    dispatch(setIncrementReducer());
    setFinPrice(quantity * price);
    console.log(quantity);
  };
  const handleDcrement = (price) => {
    dispatch(setDecrementReducer());
    if (finPrice > 0) {
      setFinPrice(finPrice - price);
    }
  };

  return (
    <div className={style.cart}>
      <Header />
      <div className={style.cart__orderProducts}>
        {Cart.length == 0 ? (
          <div>Корзина пока пуста...</div>
        ) : (
          <div>
            {Cart.map((item) => (
              <div className={style.cart__box}>
                <div className={style.cart__info}>
                  <img
                    src={item.url}
                    alt={item.name}
                    className={style.cart__img}
                  />

                  <div className={style.cart__additionally}>
                    <h1>
                      {item.name} / {item.model}
                    </h1>
                    {quantity === 1 && <h1>{item.price} ₽</h1>}
                    {quantity >= 2 && <h1>{finPrice} ₽</h1>}
                    <h1>quantity: {quantity}</h1>
                    <h1>{item.color}</h1>
                    <div>
                      <button onClick={() => handleIncrement(item.price)}>
                        +
                      </button>

                      <button onClick={() => handleDcrement(item.price)}>
                        -
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {Cart.length !== 0 ? <Link to="/Order">Order now</Link> : <div></div>}
    </div>
  );
};

// <Link to="/order">order</Link>
