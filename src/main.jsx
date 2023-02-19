import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import './common.css'
import './reset.css'
import { Root } from "./routes/root/root";
import { Order } from "./routes/order/order";
import { Cart } from "./routes/cart/cart";
import { store } from "./store/store";
import { Provider } from 'react-redux'
import { CurrentItem } from "./components/itempage/itemPage";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
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
    element: <CurrentItem/>,
  },
]);

//не забыть сделать вложенный роут вместо этих(как в тз)

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
   <RouterProvider router={router} />
  </Provider>
  
);
