import React, { useState } from "react";
import "react-credit-cards/es/styles-compiled.css";
import Cards from "react-credit-cards";
import style from "./CreditCard.module.scss";
import { useDispatch } from "react-redux";
import { setValidReducer } from "../../store/clientData/clientSlice";
export const CreditCard = ({ Name, SurName }) => {
  const dispatch = useDispatch();
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [focus, setFocus] = useState("");

  const GoBack = () => {
    dispatch(setValidReducer(false));
  };

  const Next = () => {
    dispatch(setValidReducer(false));
  };

  return (
    <div className={style.creditCard}>
      <h1 className={style.creditCard__message}>
        {Name} fill in the credit card details
      </h1>
      <Cards
        cvc={cvc}
        expiry={expiry}
        focused={focus}
        name={name}
        number={number}
      />

      <form className={style.creditCard__forms}>
        <input
          type="tel"
          name="number"
          val={number}
          placeholder={"Enter Number"}
          onChange={(e) => setNumber(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />

        <input
          type="tel"
          name="name"
          val={name}
          placeholder={"Enter Name"}
          onChange={(e) => setName(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />

        <input
          type="tel"
          name="expiry"
          val={expiry}
          placeholder={"Enter Expiry date"}
          onChange={(e) => setExpiry(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />

        <input
          type="tel"
          name="cvc"
          val={cvc}
          placeholder={"Enter Cvc"}
          onChange={(e) => setCvc(e.target.value)}
          onFocus={(e) => setFocus(e.target.name)}
        />
      </form>
      <div className={style.creditCard__controlls}>
        <button onClick={GoBack} className={style.creditCard__btn}>
          Go back
        </button>
        <button className={style.creditCard__btn}> Next</button>
      </div>
    </div>
  );
};
