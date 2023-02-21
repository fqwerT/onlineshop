import React from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAdressReducer } from "../../store/clientData/clientSlice";
//import { useEffect } from "react";
import style from "./UserAdress.module.scss";

export const UserAdress = (props) => {
const dispatch = useDispatch()

const {adress} = useSelector((state)=>({
  adress:state.clientSlice.adress
}))

  ymaps.ready(init);

  function init() {
    var suggestView = new ymaps.SuggestView("suggest"),
      map,
      placemark;
    $("#button").bind("click", function (e) {
      geocode();
    });
    function geocode() {
      var request = $("#suggest").val();
      ymaps.geocode(request).then(
        function (res) {
          var obj = res.geoObjects.get(0),
            error,
            hint;
          if (obj) {
            switch (
              obj.properties.get("metaDataProperty.GeocoderMetaData.precision")
            ) {
              case "exact":
                break;
              case "number":
              case "near":
              case "range":
                error = "Неточный адрес, требуется уточнение";
                hint = "Уточните номер дома";
                break;
              case "street":
                error = "Неполный адрес, требуется уточнение";
                hint = "Уточните номер дома";
                break;
              case "other":
              default:
                error = "Неточный адрес, требуется уточнение";
                hint = "Уточните адрес";
            }
          } else {
            error = "Адрес не найден";
            hint = "Уточните адрес";
          }
          if (error) {
            showError(error);
            showMessage(hint);
          } else {
            showResult(obj);
          }
        },
        function (e) {
          console.log(e);
        }
      );
    }
    function showResult(obj) {
      $("#suggest").removeClass("input_error");
      $("#notice").css("display", "none");
      var mapContainer = $("#map"),
        bounds = obj.properties.get("boundedBy"),
        mapState = ymaps.util.bounds.getCenterAndZoom(bounds, [
          mapContainer.width(),
          mapContainer.height(),
        ]),
        address = [obj.getCountry(), obj.getAddressLine()].join(", "),
        shortAddress = [
          obj.getThoroughfare(),
          obj.getPremiseNumber(),
          obj.getPremise(),
        ].join(" ");
      mapState.controls = [];
      createMap(mapState, shortAddress);
      showMessage(address);
   //  dispatch(setAdressReducer(address))
    }

    function showError(message) {
      $("#notice").text(message);
      $("#suggest").addClass("input_error");
      $("#notice").css("display", "block");

      if (map) {
        map.destroy();
        map = null;
      }
    }
    function createMap(state, caption) {
      if (!map) {
        map = new ymaps.Map("map", state);
        placemark = new ymaps.Placemark(
          map.getCenter(),
          {
            iconCaption: caption,
            balloonContent: caption,
          },
          {
            preset: "islands#redDotIconWithCaption",
          }
        );
        map.geoObjects.add(placemark);
      } else {
        map.setCenter(state.center, state.zoom);
        placemark.geometry.setCoordinates(state.center);
        placemark.properties.set({
          iconCaption: caption,
          balloonContent: caption,
        });
      }
    }
    function showMessage(message) {
      $("#messageHeader").text("Данные получены:");
      $("#message").text(message);
    }
  }
  return (
    <div className={style.map}>
      <div className={style.map__inputMenu}>
        <input
          type="text"
          id="suggest"
          className={style.map__input}
          placeholder="Введите адрес"
        />
        <button type="submit" id="button" className={style.map__button}>
          Проверить
        </button>
      </div>
      <p id="notice">Адрес не найден</p>
      <div id="map" style={{ height: "300px", width: "300px" }}></div>
      <div id="footer">
        <div id="messageHeader"></div>
        <div id="message"></div>
      </div>
    </div>
  );
};
