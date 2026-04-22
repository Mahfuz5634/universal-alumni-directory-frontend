import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './Layout/Home';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';


const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>
  },
  {
    path: "/login",
    element:<LoginPage></LoginPage>
  },
  {
    path:"/register",
    element:<RegisterPage></RegisterPage>
  }
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />,
  </StrictMode>,
)
