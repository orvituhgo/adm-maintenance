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
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const firestore = useFirestore();

  const { user, setActiveProfile, unsetActiveProfile, buildingsList } =
    useContext(LoginContext);

  const buildings = getBuildingList();

  async function getBuildingList() {
    const list = [];
    user?.buildingsList?.forEach(async (building, i) => {
      const response = await firestore.getBuildingDescription(building);
      list[i] = response;
    });
    console.log('list: ', list);
    return list;
  }

  useEffect(() => {
    unsetActiveProfile();
    setTimeout(() => {
      console.log('entrando no timeout');
    }, 3000);
  }, []);

  function handleNickname(e) {
    setNickname(e.target.value);
  }

  function handleUrl(e) {
    setUrl(e.target.value);
  }

  function handleClickProfile(value) {
    setActiveProfile(value);
    navigate('/home');
  }

  function handleShowAddingBox() {
    setShowBoxAdding(!showBoxAdding);
  }

  async function handleSubmitBuilding() {
    await firestore.addBuilding(nickname, url);
  }

  return (
    <>
      <div
        onClick={() => console.log('buildings: ', buildings)}
        className="flex h-screen w-screen flex-col items-center justify-evenly bg-primaryDark"
      >
        <div className="relative flex h-5/6 max-w-7xl items-center justify-start gap-8 overflow-hidden">
          {console.log(buildings) &&
            buildings.map((building, index) => (
              <div
                onClick={() => handleClickProfile(building)}
                key={index}
                className="profile-card"
              >
                <img
                  src={
                    building.url
                      ? building.url
                      : 'https://placehold.co/400x500/736b66/403d39'
                  }
                  alt={building}
                />
                <h2>{building}</h2>
              </div>
            ))}
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
              onClick={handleSubmitBuilding}
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
