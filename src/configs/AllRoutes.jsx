import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Login from '../pages/login';
import User from '../pages/user';
import Home from '../pages/home';
import Profile from '../pages/profile.jsx';
import Logout from '../pages/logout';
import Page404 from '../pages/page404';
import ForgotPassword from '../pages/forgotPassword';

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route
        path="/profile"
        element={
          <PrivateRoute>
            <Profile isClosed />
          </PrivateRoute>
        }
      />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <Home isClosed />
          </PrivateRoute>
        }
      />
      <Route
        path="/user"
        element={
          <PrivateRoute>
            <User isClosed />
          </PrivateRoute>
        }
      />
      <Route
        path="/logout"
        element={
          <PrivateRoute>
            <Logout isClosed />
          </PrivateRoute>
        }
      />
      <Route path="*" element={<Page404 />} />
    </Routes>
  );
}
