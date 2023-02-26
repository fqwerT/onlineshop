import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./assets/styles/common.css";
import "./assets/styles/reset.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { CurrentItem } from "./components/CurrentItem/CurrentItem";
import { MainPage } from "./Pages/MainPage/MainPage";
import { Cart } from "./Pages/Cart/cart";
import { Order } from "./Pages/Order/Order";
import { Categories } from "./Pages/Categories/Categories";
import { ChoosenCategory } from "./components/ChosenCategory/ChoosenCategory";
import { OrderSuccess } from "./Pages/OrderSuccess/OrderSuccess";
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainPage/>,
  },
  {
    path: "/cart",
    element: <Cart />,
  },
  {
    path: "/order",
    element: <Order />,
  },
  {
    path: "/item",
    element: <CurrentItem />,
  },
  {
   path: "/catergories",
   element: <Categories/>,
   
  },
  {
    path: "/ChoosenCatergory",
    element: <ChoosenCategory/>,
   },
   {
    path: "/Succsess",
    element: <OrderSuccess/>,
   }
]);



ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
