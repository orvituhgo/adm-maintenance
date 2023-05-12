import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { FaPlusCircle, FaCheck } from 'react-icons/fa';

import { BuildingsContext } from '../contexts/BuildingsContextProvider';
import { LoginContext } from '../contexts/LoginContextProvider';
import { useFirestore } from '../services/useFirestore';

export default function Profile() {
  const [showBoxAdding, setShowBoxAdding] = useState(false);
  const [nickname, setNickname] = useState('');
  const [url, setUrl] = useState('');

  const navigate = useNavigate();
  const firestore = useFirestore();

  const { user, setActiveProfile, unsetActiveProfile, getActiveProfile } =
    useContext(LoginContext);
  const { syncBuildingProfile, createBuildingToUser } =
    useContext(BuildingsContext);

  const { userId } = user;

  useEffect(() => {
    unsetActiveProfile();
  }, []);

  function handleNickname(e) {
    console.log(e.target.value);
    setNickname(e.target.value);
  }

  function handleUrl(e) {
    console.log(e.target.value);
    setUrl(e.target.value);
  }

  async function handleClickProfile(value) {
    setActiveProfile(value);
    await syncBuildingProfile();
    navigate('/home');
  }

  function handleShowAddingBox() {
    console.log(userId);
    setShowBoxAdding(!showBoxAdding);
  }

  function handleAddedBuilding() {
    createBuildingToUser(userId, nickname, url);
    setShowBoxAdding(false);
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
        <button className="text-offWhite" onClick={handleShowAddingBox}>
          <FaPlusCircle size={48} />
        </button>
        {showBoxAdding && (
          <div className="absolute bottom-24 flex h-fit w-fit flex-col rounded-md bg-offWhite p-5">
            <h2 className="mb-2 flex justify-center text-center font-extrabold">
              Add a building
            </h2>
            <label htmlFor="username">Nickname</label>
            <input
              type="text"
              placeholder="Insert your username"
              name="username"
              onChange={handleNickname}
              className="w-full rounded-md p-2 shadow "
            />
            <label className="mt-2" htmlFor="picture">
              Picture
            </label>
            <input
              type="url"
              placeholder="Insert your username"
              name="picture"
              onChange={handleUrl}
              className="w-full rounded-md p-2 shadow"
            />
            <button
              onClick={handleAddedBuilding}
              className="mt-2 flex h-8 w-12 items-center justify-center self-end rounded-md bg-primary"
            >
              <FaCheck color="white" />
            </button>
          </div>
        )}
      </div>
    </>
  );
}
