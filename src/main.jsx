import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./common.css";
import "./reset.css";
import { store } from "./store/store";
import { Provider } from "react-redux";
import { CurrentItem } from "./components/CurrentItem/CurrentItem";
import { MainPage } from "./Pages/MainPage/MainPage";
import { Cart } from "./Pages/Cart/cart";
import { Order } from "./Pages/Order/Order";
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
]);

//не забыть сделать вложенный роут вместо этих(как в тз)

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
