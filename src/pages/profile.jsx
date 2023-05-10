import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { FaPlusCircle } from 'react-icons/fa';

import { BuildingsContext } from '../contexts/BuildingsContextProvider';
import { LoginContext } from '../contexts/LoginContextProvider';

export default function Profile() {
  const navigate = useNavigate();
  const { user, setActiveProfile, unsetActiveProfile, getActiveProfile } =
    useContext(LoginContext);
  const { syncBuildingProfile } = useContext(BuildingsContext);

  useEffect(() => {
    unsetActiveProfile();
  }, []);

  async function handleClickProfile(value) {
    setActiveProfile(value);
    await syncBuildingProfile();
    navigate('/home');
  }

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-evenly bg-primaryDark">
        <div className="relative flex h-5/6 max-w-7xl items-center justify-start gap-8 overflow-hidden">
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
        <button>
          <FaPlusCircle size={48} />
        </button>
      </div>
    </>
  );
}
