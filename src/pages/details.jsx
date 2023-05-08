import { useParams } from 'react-router-dom';

export default function Details() {
  const id = useParams().OSid;

  return <h1>Details da OS: {id}</h1>;
}
