import React, { useContext } from 'react';
import { FaHome, FaSignInAlt, FaUserAlt, FaBuilding } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

import { LoginContext } from '../contexts/LoginContextProvider';

export default function Header() {
  const { user, activeProfile } = useContext(LoginContext);
  const pathing = useLocation().pathname;
  const noShow = ['/login', '/profile', '/forgotpassword'];

  return (
    <>
      {!noShow.includes(pathing) && (
        <nav
          onClick={() => console.log(activeProfile)}
          className="flex h-16 w-screen items-center justify-end gap-6 bg-primary text-stone-800"
        >
          {/* {isLoggedIn && <span>Olá, User</span>} */}
          {user ? (
            <span>Olá, {user.username}</span>
          ) : (
            <span>Error, user not logged </span>
          )}
          <ul className="flex w-1/4 justify-center gap-6 bg-primary">
            <li className="my-auto">
              <Link to="/home">
                <FaHome size={24} />
              </Link>
            </li>
            <li className="my-auto">
              <Link to="/user">
                <FaUserAlt size={24} />
              </Link>
            </li>
            <li className="my-auto">
              <Link to="/profile">
                <FaBuilding size={24} />
              </Link>
            </li>
            <li className="my-auto">{activeProfile}</li>
            <li className="my-auto">
              <Link to="/logout">
                <FaSignInAlt size={24} />
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </>
  );
}
