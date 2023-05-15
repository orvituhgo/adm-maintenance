export default function OsForm() {
  return (
    <form className="flex flex-col items-center justify-center gap-2 bg-red-400">
      <label htmlFor="osNumber">Número da OS</label>
      <input className="border-secundaryDark" type="text" name="osNumber" />
      <label htmlFor="osNumber">Timestamp</label>
      <input className="border-secundaryDark" type="text" name="osNumber" />
      <label htmlFor="osNumber">activity</label>
      <input className="border-secundaryDark" type="text" name="osNumber" />
      <label htmlFor="osNumber">orderBy</label>
      <input className="border-secundaryDark" type="text" name="osNumber" />
      <label htmlFor="osNumber">didBy</label>
      <input className="border-secundaryDark" type="text" name="osNumber" />
      <label htmlFor="osNumber">place</label>
      <input className="border-secundaryDark" type="text" name="osNumber" />
      <label htmlFor="osNumber">materialsUsed</label>
      <input className="border-secundaryDark" type="text" name="osNumber" />
    </form>
  );
}
