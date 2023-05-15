import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { FaPlus } from 'react-icons/fa';

import { BuildingsContext } from '../contexts/BuildingsContextProvider';
import OsForm from '../components/osForm';

export default function Home() {
  const { buildingInfo } = useContext(BuildingsContext);
  const { osList } = buildingInfo;
  const [creatingOs, setCreatingOs] = useState(false);

  function pad(num, size) {
    num = num.toString();
    while (num.length < size) num = '0' + num;
    return num;
  }

  function handleClick() {
    setCreatingOs(!creatingOs);
  }

  return (
    // <div className="flex h-3/4 flex-col items-center justify-center bg-offWhite">
    <div className="general-container">
      <div className="flex items-center bg-indigo-300 p-10 align-baseline">
        <h1 className="title-container bg-red-300">ORDEM DE SERVIÇOS</h1>
        <button
          onClick={handleClick}
          className="ml-auto flex h-8 w-12 items-center justify-center self-end rounded-md bg-success"
        >
          <FaPlus color="white" />
        </button>
      </div>
      {!creatingOs ? (
        <table className="table-os">
          <thead>
            <tr className="head-table row-table">
              <th className="cell-table">Nº OS</th>
              <th className="cell-table">Data</th>
              <th className="cell-table">Solicitante</th>
              <th className="cell-table">Atividade</th>
              <th className="cell-table">Local</th>
              <th className="cell-table">Ações</th>
            </tr>
          </thead>
          <tbody>
            {osList &&
              osList.map((os) => {
                return (
                  <tr className="row-table">
                    <td className="cell-table">{os.no}</td>
                    <td className="cell-table">{os.datetime}</td>
                    <td className="cell-table">{os.orderBy}</td>
                    <td className="cell-table">{os.type}</td>
                    <td className="cell-table">{os.local}</td>
                    <td className="cell-table link-details">
                      <Link to={`/os/${os.no}`}>Ver detalhes</Link>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      ) : (
        <OsForm />
      )}
    </div>
  );
}
