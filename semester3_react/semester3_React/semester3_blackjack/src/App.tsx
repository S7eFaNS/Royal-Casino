import './App.css'
import { Navbar } from "./layouts/NavbarAndFooter/Navbar"
import { Footer } from './layouts/NavbarAndFooter/Footer'
import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from './layouts/HomePage/HomePage'
import AnimatedBackground from './layouts/Utils/Features/AnimatedBackground'
import { Login } from './layouts/JWTLoginAndRegister/Login/Login'
import { Register } from './layouts/JWTLoginAndRegister/Register/Register'
import { ProfilePage } from './layouts/ProfilePage/ProfilePage'
import TokenManager from './layouts/Utils/API_Calls/JWT/TokenManager'
import { MarketPage } from './layouts/MarketPage/MarketPage'
import { PurchaseHistory } from './layouts/ProfilePage/PurchaseHistory'
import {BlackJack} from './layouts/BlackJack/BlackJack'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { Deposit } from './layouts/Deposit/Deposit'

export const App = () => {
  const isAuthenticated = TokenManager.getAccessToken();
  const user = TokenManager.getUser();
  const userType = user?.userType;
  return (
    <div style={{ position: 'relative', zIndex: 1, height:"63.5vh" }}>
      <AnimatedBackground
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -5,
        }}
      />
        <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={
            isAuthenticated ? <ProfilePage /> : <Navigate to="/login" />
            }/>
            <Route path="/purchaseHistory" element={
            isAuthenticated && userType === 'Customer' ? <PurchaseHistory /> : <Navigate to="/login" />
            }/>
            <Route path="/market" element={<MarketPage />} />
            <Route path="/blackjack" element={
            isAuthenticated ? <BlackJack /> : <Navigate to="/login" />
            }/>
            <Route path="/deposit" element={
            isAuthenticated ? <Deposit /> : <Navigate to="/login" />
            }/>
          </Routes>
          <ToastContainer />
        <Footer />
     </div> 
  )
}
