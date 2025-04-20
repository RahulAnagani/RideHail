import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Home from './Pages/Home.jsx'
import CaptainLogin from './Pages/CaptainLogin.jsx'
import UserLogin from './Pages/UserLogin.jsx'
import CaptainSignup from './Pages/CaptainSignup.jsx'
import UserSignup from './Pages/UserSignup.jsx'
import { Provider } from 'react-redux'
import store from './store/index.js'
import DashBoard from './Pages/DashBoard.jsx'
import AuthProtect from './Pages/AuthProtect.jsx'
import UserLogout from './Pages/UserLogout.jsx'
import CapProtect from './Pages/CapProtect.jsx'
import CapDashBoard from './Pages/CapDashBoard.jsx'
import CapSignout from './Pages/CapSignout.jsx'
import CaptainRiding from './Pages/CaptainRiding.jsx'
import SocketProvider from './Pages/SocketProvider.jsx'
import UserRiding from './Pages/UserRiding.jsx'
import Map from './components/Map.jsx'

const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <SocketProvider><App /></SocketProvider>,
      children: [
        {
          index: true,
          element: <Home />,
        },
        {
          path: '/login',
          element: <UserLogin />,
        },
        {
          path: '/signup',
          element: <UserSignup />,
        },
        {
          path: '/captain-login',
          element: <CaptainLogin />,
        },
        {
          path: '/captain-signup',
          element: <CaptainSignup />,
        },
        {
          path: '/captain-riding',
          element: <CaptainRiding />,
        },
        {
          path: '/dashboard',
          element: (
            <AuthProtect>
              <DashBoard />
            </AuthProtect>
          ),
        },
        {
          path: '/user-riding',
          element: <UserRiding />,
        },
        {
          path: '/logout',
          element: <UserLogout />,
        },
        {
          path: '/captain-logout',
          element: <CapSignout />,
        },
        {
          path: '/CapDashboard',
          element: (
            <CapProtect>
              <CapDashBoard />
            </CapProtect>
          ),
        },
      ],
    },
  ],
  {
    basename: '/RideHail', // Add this line to handle the base path
  }
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router}></RouterProvider>
    </Provider>
  </StrictMode>
)
