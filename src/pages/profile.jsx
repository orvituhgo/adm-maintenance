import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';

import { BuildingsContext } from '../contexts/BuildingsContextProvider';
import { LoginContext } from '../contexts/LoginContextProvider';

export default function Profile() {
  const navigate = useNavigate();
  const { user, activeProfile, setActiveProfile, saveActiveProfile } =
    useContext(LoginContext);
  console.log(user.buildings);

  function handleClickProfile(e) {
    const card = document.querySelector('.building-name');
    user.activeProfile.setActiveProfile(card.innerHTML);
    console.log(`user.activeprofile = ${user.activeProfile}`);
    setActiveProfile(card.innerHTML);
    saveActiveProfile(activeProfile);
    console.log(card.innerHTML, activeProfile);
    navigate('/home');
  }

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-evenly bg-primaryDark">
        <div className="flex h-5/6 max-w-[900%] items-center justify-start gap-8 overflow-x-auto">
          {/* {aqui vai entrar um map de um objeto do backend}  */}
          {user.buildings &&
            user.buildings.map((building, index) => {
              return (
                <div
                  onClick={handleClickProfile}
                  key={index}
                  className="profile-card"
                >
                  <img src={building.url} alt={building.nickname} />
                  <h2 className="building-name">{building.nickname}</h2>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}
