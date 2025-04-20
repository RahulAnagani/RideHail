import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/index.js'

import Home from "./Pages/Home.jsx"
import CaptainLogin from "./Pages/CaptainLogin.jsx"
import UserLogin from "./Pages/UserLogin.jsx"
import CaptainSignup from "./Pages/CaptainSignup.jsx"
import UserSignup from "./Pages/UserSignup.jsx"
import DashBoard from './Pages/DashBoard.jsx'
import AuthProtect from './Pages/AuthProtect.jsx'
import UserLogout from './Pages/UserLogout.jsx'
import CapProtect from './Pages/CapProtect.jsx'
import CapDashBoard from './Pages/CapDashBoard.jsx'
import CapSignout from './Pages/CapSignout.jsx'
import CaptainRiding from './Pages/CaptainRiding.jsx'
import SocketProvider from './Pages/SocketProvider.jsx'
import UserRiding from './Pages/UserRiding.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <Router>
        <SocketProvider>
          <App />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/signup" element={<UserSignup />} />
            <Route path="/captain-login" element={<CaptainLogin />} />
            <Route path="/captain-signup" element={<CaptainSignup />} />
            <Route path="/captain-riding" element={<CaptainRiding />} />
            <Route path="/dashboard" element={<AuthProtect><DashBoard /></AuthProtect>} />
            <Route path="/user-riding" element={<UserRiding />} />
            <Route path="/logout" element={<UserLogout />} />
            <Route path="/captain-logout" element={<CapSignout />} />
            <Route path="/CapDashboard" element={<CapProtect><CapDashBoard /></CapProtect>} />
          </Routes>
        </SocketProvider>
      </Router>
    </Provider>
  </StrictMode>
)
