import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from "./Pages/Home.jsx";
import CaptainLogin from "./Pages/CaptainLogin.jsx"
import UserLogin from "./Pages/UserLogin.jsx"
import CaptainSignup from "./Pages/CaptainSignup.jsx"
import UserSignup from "./Pages/UserSignup.jsx";
import { Provider } from 'react-redux';
import store from './store/index.js';
import DashBoard from './Pages/DashBoard.jsx';
import AuthProtect from './Pages/AuthProtect.jsx';
import UserLogout from './Pages/UserLogout.jsx';
import CapProtect from './Pages/CapProtect.jsx';
import CapDashBoard from './Pages/CapDashBoard.jsx';
import CapSignout from './Pages/CapSignout.jsx';
import CaptainRiding from './Pages/CaptainRiding.jsx';
import SocketProvider from './Pages/SocketProvider.jsx';
import UserRiding from './Pages/UserRiding.jsx';
import Map from './components/Map.jsx';
const router=createBrowserRouter([{
  path:"/",
  element:<SocketProvider><App></App></SocketProvider>,
  children:[
    {
      index:true,
      element:<Map></Map>
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
    },
    {
      path:"/captain-riding",
      element:<CaptainRiding></CaptainRiding>
    },
    {
      path:"/dashboard",
      element:
      <AuthProtect>
        <DashBoard></DashBoard>
      </AuthProtect>
    },
    {
      path:"/user-riding",
      element:<UserRiding></UserRiding>
    }
    ,
    {
      path:"/logout",
      element:<UserLogout></UserLogout>
    },
    {
      path:"captain-logout",
      element:<CapSignout></CapSignout>
    }
    ,
    {
      path:"CapDashboard",
      element:

      <CapProtect>
        <CapDashBoard></CapDashBoard>
      </CapProtect>
    }
  ]
},
]);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>,
)