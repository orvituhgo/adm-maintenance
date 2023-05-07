import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import LoginContextProvider from './contexts/LoginContextProvider';
import BuildingsContextProvider from './contexts/BuildingsContextProvider';
import Header from './components/header';
import AllRoutes from './configs/AllRoutes';

export default function App() {
  return (
    <LoginContextProvider>
      <BuildingsContextProvider>
        <Router>
          <Header />
          <AllRoutes />
          <ToastContainer autoClose={3000} className="toast-container" />
        </Router>
      </BuildingsContextProvider>
    </LoginContextProvider>
  );
}
