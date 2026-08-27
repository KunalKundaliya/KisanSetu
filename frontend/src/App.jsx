import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './layouts/MainLayout';
import Splash from './pages/Splash/Splash';
import Login from './pages/Login/Login';
import ProfileCreation from './pages/Onboarding/ProfileCreation';
import Home from './pages/Home/Home';
import Chat from './pages/Chat/Chat';
import SchemesList from './pages/Schemes/SchemesList';
import SchemeDetails from './pages/Schemes/SchemeDetails';
import SellCrop from './pages/Marketplace/SellCrop';
import MandiBhav from './pages/Marketplace/MandiBhav';
import MySales from './pages/Marketplace/MySales';
import Profile from './pages/Profile/Profile';
import { UserProvider } from './context/UserContext';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<MainLayout />}>
              <Route path="/" element={<Splash />} />
              <Route path="/login" element={<Login />} />
              <Route path="/onboarding" element={<ProfileCreation />} />

              {/* Main App Routes */}
              <Route path="/home" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/schemes" element={<SchemesList />} />
              <Route path="/schemes/:id" element={<SchemeDetails />} />
              <Route path="/sell" element={<SellCrop />} />
              <Route path="/mandi-bhav" element={<MandiBhav />} />
              <Route path="/sales" element={<MySales />} />
              <Route path="/profile" element={<Profile />} />

              {/* Fallback */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;
