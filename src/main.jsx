import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RoutLayout from './RoutLayout.jsx';
import { Provider } from 'react-redux'
import { store } from './Store.js';


const router = createBrowserRouter([
  {
    path: "/",
    Component: RoutLayout,
    children: [
      { index: true, Component: App },
      // { path: "about", Component: About },

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
