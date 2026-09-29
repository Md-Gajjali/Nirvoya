import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RoutLayout from './RoutLayout.jsx';
import { Provider } from 'react-redux'
import { store } from './Store.js';
import ProductDetails from './Pages/ProductDetails.jsx';
import CartPage from './Pages/Cart.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    Component: RoutLayout,
    children: [
      { index: true, Component: App },
      { path: "ProductDetailss/:id", Component: ProductDetails },
      { path: "CartItem", Component: CartPage },

    ],
  },
]);



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />,
    </Provider>
  </StrictMode>,
)
