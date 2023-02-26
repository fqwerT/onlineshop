import React, { useState, useEffect } from "react";
import { setAdressReducer } from "../../store/clientData/clientSlice";
import style from "./UserAdress.module.scss";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
export const UserAdress = (props) => {
  const [adress, SetAdress] = useState("");
  const [items, setItems] = useState("");
  const dispatch = useDispatch();
  const handleAdress = (e) => {
    SetAdress(e.target.value);
  };

  const { Choosenadress } = useSelector((state) => ({
    Choosenadress: state.clientSlice.adress,
  }));

  ymaps.suggest(adress).then(function (items) {
    setItems(items);
  });

  const setAdress = (name) => {
    dispatch(setAdressReducer(name));
    console.log(Choosenadress);
  };

  useEffect(() => {}, [Choosenadress]);
  return (
    <div className={style.adressMenu}>
      <h1 className={style.adressMenu__header}>Enter the address</h1>
      <div className={style.adressMenu__input}>
        <input
          onChange={(e) => handleAdress(e)}
          type="tel"
          placeholder="adress"
          className={style.adressMenu__setAdrees}
        />
        <div className={style.adressMenu__setAdrees__result}>
          <ul>
            {items.length !== 0 &&
              items.map((item) => (
                <li
                  className={style.adressMenu__setAdrees__resultItem}
                  onClick={() => setAdress(item.displayName)}
                >
                  {item.displayName}
                </li>
              ))}
          </ul>
        </div>
      </div>
      <div className={style.adressMenu__input}>
        <div className={style.adressMenu__inputMenu}>
          <div>
            <p className={style.adressMenu__inputHeader}>Adress :</p>
          </div>
          <input
            value={Choosenadress != null ? Choosenadress : adress}
            className={style.adressMenu__input__field}
          />
        </div>
        <div className={style.adressMenu__inputMenu}></div>
      </div>
    </div>
  );
};
