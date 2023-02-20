import React, { useState, useEffect } from "react";
import style from "./Input.module.scss";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCurrentReducer } from "../../store/items/itemsSlice";
export const InputSearch = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [active, setActive] = useState(false);
  const items = useSelector((state) => state.itemsSlice.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChange = (e) => {
    setSearchTerm(e.target.value);
    setActive(true);
    if (e.target.value.length == 0) {
      setActive(false);
    }
  };

  const results = !searchTerm
    ? items
    : items.filter((item) =>
        item.model.toLowerCase().includes(searchTerm.toLocaleLowerCase())
      );

  const handleInfo = (item) => {
    dispatch(setCurrentReducer(item));
    navigate("/item");
    console.log(current);
  };
  return (
    <div className={style.input}>
      <div>
        <form className={style.input__form}>
          <input
            className={style.input__field}
            placeholder="Search"
            onChange={(e) => handleChange(e)}
            value={searchTerm}
          />
          <div className={style.input__searchResultMini}>
            {active &&
              results.map((item) => (
                <div>
                  <div className={style.input__searchResultMini__text}>
                    <h1>
                      {item.name}/{item.model}
                    </h1>
                    <h1>{item.color}</h1>
                    <h1>{item.price} ₽</h1>
                  </div>
                  <div>
                    <img
                      src={item.url}
                      className={style.input__searchResultMini__img}
                    />
                  </div>
                  <div
                    onClick={() => handleInfo(item)}
                    className={style.itemlist__info}
                  >
                    About
                  </div>
                </div>
              ))}
          </div>
        </form>
      </div>
    </div>
  );
};
