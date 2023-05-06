import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import Header from './components/header';
import AllRoutes from './configs/AllRoutes';

export default function App() {
  return (
    <Router>
      <Header />
      <AllRoutes />
      <ToastContainer autoClose={3000} className="toast-container" />
    </Router>
  );
}
