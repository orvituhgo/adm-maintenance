import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/login');
    }, 2500);
  }, []);

  return (
    <div>
      <p>Você saiu!</p>
    </div>
  );
}
