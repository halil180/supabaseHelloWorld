import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  Outlet,
} from "react-router-dom";
import Home from './pages/Home';
import Create from './pages/Create';
import Update from './pages/Update';

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
            <nav>
        <h1>Hello World</h1>
        <Link to="/">About Us</Link>
        <Link to="/create">About Us</Link>
      </nav>
      <Outlet/>
      </>
    ),
    children:[
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/create",
        element:<Create/>,
      },
      {
        path: "/:id",
        element: <Update/>,
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <RouterProvider router={router} />
  </React.StrictMode>,
)
