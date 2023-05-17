import { useNavigate } from 'react-router-dom';
import { useContext, useEffect, useState } from 'react';
import { FaPlusCircle, FaCheck } from 'react-icons/fa';

import { BuildingsContext } from '../contexts/BuildingsContextProvider';
import { LoginContext } from '../contexts/LoginContextProvider';
import { useFirestore } from '../services/useFirestore';
import { db } from '../configs/firebase';

export default function Profile() {
  const [showBoxAdding, setShowBoxAdding] = useState(false);
  const [nickname, setNickname] = useState('');
  const [url, setUrl] = useState('');
  const [buildingsToShow, setBuildingsToShow] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successAdding, setSuccessAdding] = useState(false);

  const navigate = useNavigate();
  const firestore = useFirestore();

  const { user, setActiveProfile, unsetActiveProfile } =
    useContext(LoginContext);

  const { userId, buildingsList } = user;

  useEffect(() => {
    unsetActiveProfile();
  }, [buildingsList]);

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
    console.log(buildingsList, buildingsToShow);
    setShowBoxAdding(!showBoxAdding);
  }

  async function handleSubmitBuilding() {
    const image = 'https://placehold.co/600x400';
    const addedBuilding = await firestore.addBuilding(nickname, image);
    const updatedUser = await firestore.updateUserBuildingList(nickname);
    if (addedBuilding && updatedUser) {
      setSuccessAdding(true);
      setTimeout(() => {
        setSuccessAdding(false);
      }, 1500);
    }
  }

  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-evenly bg-primaryDark">
        <div className="relative flex h-5/6 max-w-7xl items-center justify-start gap-8 overflow-auto">
          {!loading &&
            buildingsToShow.map((building, index) => {
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
          {loading && (
            <button
              onClick={() => console.log('mostrar prédios')}
              className="base-button-lg"
            >
              Show buildings
            </button>
          )}
        </div>
        <button className="text-offWhite" onClick={handleShowAddingBox}>
          <FaPlusCircle size={48} />
        </button>

        {showBoxAdding && (
          <div className="absolute bottom-24 flex h-fit w-fit flex-col rounded-md bg-offWhite p-5">
            {!successAdding ? (
              <>
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
              </>
            ) : (
              <div className="rounded-md border-success bg-success/30 text-center font-semibold leading-10 text-success">
                <h2>Created account</h2>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}
