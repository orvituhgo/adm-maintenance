import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useContext } from 'react';

import { LoginContext } from '../contexts/LoginContextProvider';

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useContext(LoginContext);

  useEffect(() => {
    setTimeout(() => {
      logout();
      navigate('/login');
    }, 2000);
  }, []);

  return (
    <div>
      <p>Você saiu!</p>
    </div>
  );
}
