import { Link } from 'react-router-dom';
import { useContext } from 'react';

import { BuildingsContext } from '../contexts/BuildingsContextProvider';

export default function Home() {
  const { buildingInfo } = useContext(BuildingsContext);
  console.log(buildingInfo);
  const { osList } = buildingInfo;
  console.log(osList);

  return (
    // <div className="flex h-3/4 flex-col items-center justify-center bg-offWhite">
    <div className="general-container">
      <h1 className="title-container">ORDEM DE SERVIÇOS</h1>
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
          <tr className="row-table">
            <td className="cell-table">123456</td>
            <td className="cell-table">DD/MM/AA HH:MM</td>
            <td className="cell-table">Maria Silva</td>
            <td className="cell-table">Manutenção Corretiva</td>
            <td className="cell-table">8º Andar</td>
            <td className="cell-table link-details">
              <Link to="/os/123456">Ver detalhes</Link>
            </td>
          </tr>
          <tr className="row-table">
            <td className="cell-table">234567</td>
            <td className="cell-table">DD/MM/AA HH:MM</td>
            <td className="cell-table">José Maria</td>
            <td className="cell-table">Manutenção Preditiva</td>
            <td className="cell-table">Apart. nº702</td>
            <td className="cell-table link-details">
              <Link to="/os/234567">Ver detalhes</Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
