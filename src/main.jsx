import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import Home from './Layout/Home';
import LoginPage from './Pages/Login';
import RegisterPage from './Pages/Register';
import { AuthProvider } from './context/authContext';
import AlumniDashboard from './Dashboard/AlumniDashboard';
import StudentDashboard from './Dashboard/StudentDashboard';
import SystemAdminDashboard from './Dashboard/SystemAdminDashboard';
import UniAdminDashboard from './Dashboard/UniAdminDashboard';
import ProtectedRoute from './protectedRoutes/protecetedRoutes';


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
  ,
    
      {
        path: "/system-admin", 
        element: <ProtectedRoute><SystemAdminDashboard/></ProtectedRoute>
      },
      {
        path: "/uni-admin",
        element: <UniAdminDashboard />
      },
      // {
      //   path: "/alumni",
      //   element: <AlumniDashboard />
      // },
      {
        path: "/student",
        element:<ProtectedRoute><StudentDashboard/></ProtectedRoute>
      }
    

  
  
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
   <AuthProvider>
     <RouterProvider router={router} />,
   </AuthProvider>
  </StrictMode>,
)
