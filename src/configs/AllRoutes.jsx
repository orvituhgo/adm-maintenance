import React from 'react';
import { Routes, Route } from 'react-router-dom';

import PrivateRoute from './PrivateRoute';
import Login from '../pages/login';
import ForgotPassword from '../pages/forgotPassword';
import SignUp from '../pages/signUp';
import Profile from '../pages/profile.jsx';
import Home from '../pages/home';
import User from '../pages/user';
import Page404 from '../pages/page404';
import Details from '../pages/details';
import Logout from '../pages/logout';

export default function AllRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/forgotpassword" element={<ForgotPassword />} />
      <Route path="/signin" element={<SignUp />} />
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
        path="/os/:OSid"
        element={
          <PrivateRoute>
            <Details isClosed />
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
