import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from "./Pages/Home.jsx";
import CaptainLogin from "./Pages/CaptainLogin.jsx"
import UserLogin from "./Pages/UserLogin.jsx"
import CaptainSignup from "./Pages/CaptainSignup.jsx"
import UserSignup from "./Pages/UserSignup.jsx"
const router=createBrowserRouter([{
  path:"/",
  element:<App></App>,
  children:[
    {
      index:true,
      element:<Home></Home>
    },
    {
      path:"/login",
      element:<UserLogin></UserLogin>
    },
    {
      path:"/signup",
      element:<UserSignup></UserSignup>
    },{
    path:"/captain-login",
    element:<CaptainLogin></CaptainLogin>
    },
    {
      path:"/captain-signup",
      element:<CaptainSignup></CaptainSignup>
    }
  ]
},
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
