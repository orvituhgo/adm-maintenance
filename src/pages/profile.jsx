export default function Profile() {
  return (
    <>
      <div className="flex h-screen w-screen flex-col items-center justify-evenly bg-primaryDark">
        <div className="flex h-5/6 w-full items-center justify-center gap-2 overflow-x-auto bg-red-500">
          {/* {aqui vai entrar um map de um objeto do backend}  */}
          <div className="flex h-full w-64 min-w-fit items-center justify-center rounded-sm bg-offWhite shadow-sm">
            <img src="placeholder.com/300/200" alt="" srcset="" />
          </div>
          <div className="flex h-full w-64 items-center justify-center rounded-sm bg-offWhite shadow-sm">
            2222222222222
          </div>
          <div className="flex h-full w-64 items-center justify-center rounded-sm bg-offWhite shadow-sm">
            3333333333333
          </div>
          <div className="flex h-full w-1/3 items-center justify-center rounded-sm bg-offWhite shadow-sm">
            4444444444444
          </div>
          <div className="flex h-full w-1/3 items-center justify-center rounded-sm bg-offWhite shadow-sm">
            5555555555555
          </div>
          <div className="flex h-full w-1/3 items-center justify-center rounded-sm bg-offWhite shadow-sm">
            6666666666666
          </div>
        </div>
        <button>cadastrar novo</button>
      </div>
    </>
  );
}
