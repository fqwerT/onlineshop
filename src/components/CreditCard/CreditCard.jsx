import React, { useState, useRef, useEffect } from "react";
import style from "./CreditCard.module.scss";
import { useDispatch } from "react-redux";
import { setValidReducer } from "../../store/clientData/clientSlice";
import img from "../../assets/imgs/visa.png";
import { Link } from "react-router-dom";
export const CreditCard = ({ Name }) => {
  const dispatch = useDispatch();
  const [number, setNumber] = useState("");
  const [name, setName] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [valid, setValid] = useState(false);
  const [error, setError] = useState("");
  const ref = useRef(null);
  const ref2 = useRef(null);
  const GoBack = () => {
    dispatch(setValidReducer(false));
  };

  const handleChangeNumber = (e) => {
    let cardCode = e.target.value.replace(/[^\d]/g, "").substring(0, 16);
    cardCode = cardCode != "" ? cardCode.match(/.{1,4}/g).join(" ") : "";
    setNumber(cardCode);
    if (e.target.value.length > 16) {
      setValid(false);
      setError("the number field cannot be longer than 16 characters");
    } else setError("");
    if (!e.target.value) {
      setValid(false);
      setError("the number field cannot be empty");
    } else setError("");
  };

  const HandleChangeExpiry = (e) => {
    if (e.target.value.length <= 4) {
      const newarr = e.target.value.split("");
      newarr.splice(2, 0, "/");
      const stringArr = newarr.join("");
      setExpiry(stringArr);
      setValid(false);
      setError("the expire field cannot be longer than 4 characters");
    } else setError("");
    if (!e.target.value) {
      setValid(false);
      setError("the number field cannot be empty");
    } else setError("");
  };

  const onCvcChange = (e) => {
    setCvc(e.target.value);
    if (e.target.value <= 3) {
      setValid(false);
      setError("the cvc field cannot be longer than 3 characters");
    } else setError("");

    if (!e.target.value) {
      setValid(false);
      setError("the number field cannot be empty");
    } else setError("");
  };

  const setBackCard = () => {
    const elem = ref.current;
    elem.classList.add(`${style.creditCard__hide}`);
    const elem2 = ref2.current;
    elem2.classList.add(`${style.creditCard__show}`);
  };

  const setFrontCard = () => {
    const elem = ref.current;
    elem.classList.remove(`${style.creditCard__hide}`);
    const elem2 = ref2.current;
    elem2.classList.remove(`${style.creditCard__show}`);
  };

  useEffect(() => {
    console.log(error);
  }, [error]);

  return (
    <div className={style.creditCard}>
      <h1 className={style.creditCard__message}>
        {Name} fill in the credit card details
      </h1>

      <div className={style.creditCard__card__wrapper} ref={ref}>
        <div>
          <img src={img} className={style.creditCard__card__logo} />
        </div>
        <div>
          <input
            value={number}
            type="tel"
            className={style.creditCard__card__number}
          />
        </div>
        <div className={style.creditCard__card__bottom}>
          <input
            value={name}
            type="tel"
            className={style.creditCard__card__name}
          />
          <input
            value={expiry}
            type="tel"
            className={style.creditCard__card__expires}
          />
        </div>
      </div>
      <div className={style.creditCard__card__wrapperback} ref={ref2}>
        <div className={style.creditCard__card__wrapperback__container}>
          <div className={style.creditCard__card__wrapperback__Boxinput}>
            <input
              value={cvc}
              type="tel"
              className={style.creditCard__card__wrapperback__input}
            />
          </div>
        </div>
      </div>
      <form className={style.creditCard__forms}>
        <input
          type="tel"
          name="number"
          val={number}
          placeholder={"Enter Number"}
          onChange={(e) => handleChangeNumber(e)}
          onFocus={(e) => setFrontCard(e)}
        />

        <input
          type="tel"
          name="name"
          val={name}
          placeholder={"Enter Name"}
          onChange={(e) => setName(e.target.value)}
          onFocus={(e) => setFrontCard(e)}
        />

        <input
          type="tel"
          name="expiry"
          val={expiry}
          placeholder={"Enter Expiry date"}
          onChange={(e) => HandleChangeExpiry(e)}
          onFocus={(e) => setFrontCard(e)}
        />

        <input
          type="tel"
          name="cvc"
          val={cvc}
          placeholder={"Enter Cvc"}
          onChange={(e) => onCvcChange(e)}
          onFocus={(e) => setBackCard(e)}
        />
      </form>
      <div className={style.creditCard__controlls}>
        <button onClick={GoBack} className={style.creditCard__btn}>
          Go back
        </button>
        {error.length == 0 && (
          <Link to="/Succsess" className={style.creditCard__btn}>
            {" "}
            Next
          </Link>
        )}
      </div>
    </div>
  );
};
