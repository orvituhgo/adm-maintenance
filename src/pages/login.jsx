import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContextProvider';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  function handleUsernameInput(e) {
    setUsername(e.target.value);
    console.log(username);
  }
  function handlePasswordInput(e) {
    setPassword(e.target.value);
    console.log(password);
  }
  async function handleLogin() {
    if (username && password) {
      const isLogged = await login(username, password);
      if (isLogged) {
        navigate('/profile');
      }
    } else {
      alert('username and password does not right');
    }
  }

  return (
    <div className=" flex h-screen w-screen items-center justify-center">
      <form
        action=""
        className="min-w-1/6 flex h-3/6 flex-col items-center justify-around rounded-md bg-offWhite shadow-sm"
      >
        <h1 className="text-3xl font-bold">Login</h1>
        <div className="flex w-[80%] flex-col flex-wrap gap-4">
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              placeholder="Insert your username"
              name="username"
              onChange={handleUsernameInput}
              className="w-full rounded-md p-2 shadow"
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Insert your password"
              name="password"
              onChange={handlePasswordInput}
              className="w-full rounded-md p-2 shadow"
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
            onClick={handleLogin}
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
