import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setNameReducer } from "../../store/clientData/clientSlice";
import { setSurnameReducer } from "../../store/clientData/clientSlice";
import { setValidReducer } from "../../store/clientData/clientSlice";
import style from "./UserInput.module.scss";
export const UserInput = () => {
  const [error, setError] = useState("");
  const { name, surname } = useSelector((state) => ({
    name: state.clientSlice.name,
    surname: state.clientSlice.surname,
  }));
  const refSurname = React.createRef();
  const refName = React.createRef();
  const dispatch = useDispatch();
  const setName = (e) => {
    dispatch(setNameReducer(e.target.value));
  };
  const setSurName = (e) => {
    dispatch(setSurnameReducer(e.target.value));
  };
  const testInputData = () => {
    if (!name) {
      setError(`error: name field is empty!`);
      dispatch(setValidReducer(false));
    }
    if (!surname) {
      setError(`error: surname field is empty!`);
      dispatch(setValidReducer(false));
    }
    if (refSurname.current.value[0] === " ") {
      setError(`error: surname field contains a space at the beginning!`);
      dispatch(setValidReducer(false));
    }
    if (refName.current.value[0] === " ") {
      setError(`error: name field contains a space at the beginning!`);
      dispatch(setValidReducer(false));
    }
    if (name && surname) {
      setError(false), dispatch(setValidReducer(true));
    }
  };

  return (
    <div className={style.userInput}>
      <h1 className={style.userInput__message}>Hello! enter your first and last name</h1>
      <div className={style.userInput__form}>
        <input placeholder="name" onChange={(e) => setName(e)} ref={refName} className={style.userInput__input} />
        <input
          placeholder="surname"
          onChange={(e) => setSurName(e)}
          ref={refSurname}
          className={style.userInput__input}
        />
       <h1 className={style.userInput__error}>{error}</h1> 

      </div>
      <button onClick={() => testInputData()} className={style.userInput__btn}>Next</button>
    </div>
  );
};
