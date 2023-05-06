import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-primaryDark">
      <form
        action=""
        className="flex h-3/6 w-2/5 flex-col items-center justify-around rounded-md bg-offWhite shadow-sm"
      >
        <h1 className="text-3xl font-bold">Login</h1>
        <div className="flex w-1/2 flex-col flex-wrap gap-4">
          <div>
            <label htmlFor="username">Username</label>
            <input
              placeholder="Insert your username"
              className="w-full rounded-md p-2 shadow"
              type="text"
              name="username"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              placeholder="Insert your password"
              className="w-full rounded-md p-2 shadow"
              type="text"
              name="password"
            />
            <span className="text-right text-xs text-primary hover:text-primaryDark">
              <Link to="/forgotpassword">Did you forget your password?</Link>
            </span>
          </div>
        </div>
        <div className="flex h-1/6 w-1/2 flex-wrap items-center justify-center gap-4 bg-white shadow-sm">
          <input className="" type="checkbox" name="" id="" />
          <span>RE-CAPTCHA</span>
        </div>

        <div className="flex gap-4">
          <button className="base-button-lg" type="button">
            SIGN IN
          </button>
          <button
            onClick={() => navigate('/profile')}
            className="base-button-lg"
            type="button"
          >
            LOGIN
          </button>
        </div>
      </form>
    </div>
  );
}
