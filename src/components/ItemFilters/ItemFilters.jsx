import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setItemsPriceReducer } from "../../store/items/itemsSlice";
import { setFilteredPrice } from "../../store/items/itemsSlice";
import { setChangeItems } from "../../store/items/itemsSlice";
import { setFilteredColor } from "../../store/items/itemsSlice";
import { setRemoveDuplicates } from "../../store/items/itemsSlice";
import { setColorsReducer } from "../../store/items/itemsSlice";
import style from "./itemFilter.module.scss";

export const Filters = () => {

  const dispatch = useDispatch();
  const [activeFillter, setActiveFillter] = useState(false);
  const { items,  filtered, colors } = useSelector((state) => ({
    items: state.itemsSlice.items,
    price: state.itemsSlice.itemsPrice,
    filtered: state.itemsSlice.filteredItems,
    colors: state.itemsSlice.colors,
  }));

  const [currentPrice, setCurrentPrice] = useState(5000);
  const arrPrice = items.map((item) => item.price);
  const newPriceArr = arrPrice.sort(function (a, b) {
    return a - b;
  });

  const changePriceValue = (event) => {
    setCurrentPrice(event.target.value);
  };
  const ref = useRef(null);
  useEffect(() => {
    dispatch(setItemsPriceReducer(newPriceArr));
    dispatch(setColorsReducer());
    dispatch(setRemoveDuplicates());
  }, [ filtered]);

   useEffect(() => {
    dispatch(setFilteredPrice(currentPrice));
    setActiveFillter(true);
  }, [currentPrice,items]);

  const removeApply = useCallback(() => {
    dispatch(setChangeItems());
    setActiveFillter(false);
  }, [currentPrice]);

  const handleApplyColor = useCallback(
    (item) => {
      dispatch(setFilteredColor(item));
      setActiveFillter(true);
    },
    [currentPrice]
  );

  const handleShowColorFilters = () => {
    ref.current.classList.toggle(`${style.fillters__show}`);
  };

  return (
    <div className={style.fillters}>
      <div className={style.fillters__price}>
        {activeFillter && (
          <h1 onClick={removeApply} className={style.fillters__btn}>
            Reset all
          </h1>
        )}
        <h1 className={style.fillters__header}>
          price: {currentPrice}₽
        </h1>
        <input
          type="range"
          onChange={changePriceValue}
          min={0}
          max={15000}
          step={1}
          value={[currentPrice]}
        ></input>
      </div>
      <div className={style.fillters__color}>
        <h1 className={style.fillters__header} onClick={handleShowColorFilters}>
          color
        </h1>
        <div className={style.fillters__hide} ref={ref}>
          {colors.map((item) => (
            <h1
              className={style.fillters__color__btn}
              onClick={() => handleApplyColor(item)}
            >
              {item}
            </h1>
          ))}
        </div>
      </div>
      <div className={style.fillters__toCategory__btn}>
        <Link className={style.fillters__toCategory__link} to="/catergories">
          brand
        </Link>
      </div>
    </div>
  );
};
