import React from 'react';
import { FaHome, FaSignInAlt, FaUserAlt, FaBuilding } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';

export default function Header() {
  const isLogged = true;
  const pathing = useLocation().pathname;
  const noShow = ['/login', '/profile', '/forgotpassword'];

  return (
    <>
      {!noShow.includes(pathing) && (
        <nav className="w-scree flex h-16 items-center justify-end gap-6 bg-primary pr-12">
          {isLogged && <span>Olá, User</span>}
          <ul className="flex justify-end gap-6 bg-primary">
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
