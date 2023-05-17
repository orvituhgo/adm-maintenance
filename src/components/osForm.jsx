import { useContext, useEffect, useState } from 'react';
import { db } from '../configs/firebase';
import { setDoc, doc, getDocs } from 'firebase/firestore';
import { LoginContext } from '../contexts/LoginContextProvider';

export default function OsForm({ setOsList }) {
  const [osNumber, setOsNumber] = useState('');
  const [activity, setActivity] = useState('');
  const [orderBy, setOrderBy] = useState('');
  const [didBy, setDidBy] = useState('');
  const [place, setPlace] = useState('');
  const [materialsUsed, setMaterialsUsed] = useState('');

  const { getActiveProfile } = useContext(LoginContext);

  const activeProfile = getActiveProfile();

  function handleInitOsList() {}

  return (
    <form>
      <div className="form-container ml-3 mt-3 w-1/3 rounded-xl px-12">
        <label htmlFor="osNumber">osNumber</label>
        <input
          disabled
          className="input-disabled"
          type="text"
          name="osNumber"
        />
        <label htmlFor="osNumber">Timestamp</label>
        <input className="input" type="text" name="osNumber" />
        <label htmlFor="osNumber">activity</label>
        <select className="input focus:rounded-b-none" name="activity">
          <option className="option" value="manut-corretiva-emerg">
            Corretiva Emergencial
          </option>
          <option className="option" value="manut-corretiva-prog">
            Corretiva Programada
          </option>
          <option className="option" value="manut-preventiva">
            Preventiva
          </option>
          <option className="option" value="manut-preditiva">
            Preditiva
          </option>
        </select>
        <label htmlFor="osNumber">orderBy</label>
        <input className="input" type="text" name="osNumber" />
        <label htmlFor="osNumber">didBy</label>
        <input className="input" type="text" name="osNumber" />
        <label htmlFor="osNumber">place</label>
        <input className="input" type="text" name="osNumber" />
        <label htmlFor="osNumber">materialsUsed</label>
        <input className="input" type="text" name="osNumber" />
        <button className="base-button-lg mx-auto mt-4 bg-offWhite text-secundaryDark">
          Create OS
        </button>
      </div>
    </form>
  );
}
