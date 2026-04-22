import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './Layout/Home';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';
import { AuthProvider } from './context/authContext';
import DashboardLayout from './Dashboard/DashboardLayout';
import AlumniDashboard from './Dashboard/AlumniDashboard';
import StudentDashboard from './Dashboard/StudentDashboard';
import SystemAdminDashboard from './Dashboard/SystemAdminDashboard';
import UniAdminDashboard from './Dashboard/UniAdminDashboard';


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
  ,{
    path:"/dashboard",
    element:<DashboardLayout></DashboardLayout>,
    children:[
      {
        path: "system-admin", 
        element: <SystemAdminDashboard />
      },
      {
        path: "uni-admin",
        element: <UniAdminDashboard />
      },
      {
        path: "alumni",
        element: <AlumniDashboard />
      },
      {
        path: "student",
        element: <StudentDashboard />
      }
    ]

  }
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
     <RouterProvider router={router} />,
   </AuthProvider>
  </StrictMode>,
)
