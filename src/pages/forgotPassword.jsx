import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';

export default function ForgotPassword() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-primaryDark">
      <form
        action=""
        className="flex h-2/6 w-2/6 flex-col items-center justify-around rounded-md bg-offWhite shadow-sm"
      >
        <h1 className="text-2xl font-bold">Reset Password</h1>
        <div className="flex w-1/2 flex-col flex-wrap gap-4">
          <div>
            <label htmlFor="email">E-mail</label>
            <input
              placeholder="Insert your e-mail"
              className="w-full rounded-md p-2 shadow"
              type="text"
              name="email"
            />
          </div>
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="rounded-md bg-primary px-4 py-2 font-bold text-white shadow"
            type="button"
          >
            VOLTAR
          </button>
          <button
            className="rounded-md bg-primary px-6 py-4 font-bold text-white shadow"
            type="button"
          >
            ENVIAR
          </button>
        </div>
      </form>
    </div>
  );
}
