import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { BuildingsContext } from '../contexts/BuildingsContextProvider';
import { LoginContext } from '../contexts/LoginContextProvider';

export default function Profile() {
  const navigate = useNavigate();
  const { user, setActiveProfile, unsetActiveProfile } =
    useContext(LoginContext);
  console.log(user.buildings);

  useEffect(() => {
    unsetActiveProfile();
  }, []);

  function handleClickProfile(value) {
    setActiveProfile(value);
    navigate('/home');
  }

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-evenly bg-primaryDark">
        <div className="flex h-5/6 max-w-[900%] items-center justify-start gap-8 overflow-x-auto">
          {user.buildings &&
            user.buildings.map((building, index) => {
              return (
                <div
                  onClick={() => handleClickProfile(building.nickname)}
                  key={index}
                  className="profile-card"
                >
                  <img src={building.url} alt={building.nickname} />
                  <h2>{building.nickname}</h2>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
