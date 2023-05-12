import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LoginContext } from '../contexts/LoginContextProvider';
import { auth } from '../configs/firebase';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

import { signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(LoginContext);
  const [wrongInfo, setWrongInfo] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  function handleUsernameInput(e) {
    setUsername(e.target.value);
  }
  function handlePasswordInput(e) {
    setPassword(e.target.value);
  }
  function toggleShowPassword(e) {
    e.preventDefault();
    setShowPassword(!showPassword);
  }
  function handleDown(e) {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLogin();
    }
  }
  async function handleLogin() {
    if (username && password) {
      const isLogged = await login(username, password);
      if (isLogged) {
        navigate('/profile');
        return;
      }
    } else {
      alert('username and password does not right');
      return;
    }
    setWrongInfo(true);
  }

  return (
    <div className=" flex h-screen w-screen items-center justify-center">
      <form
        method="get"
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
            <label htmlFor="password">
              Password{' '}
              {showPassword ? (
                <button className="relative right-0 items-end self-end align-middle text-secundaryDark">
                  <FaRegEye size={18} onClick={toggleShowPassword} />
                </button>
              ) : (
                <button className="relative left-0 items-end self-end align-middle text-secundaryDark">
                  <FaRegEyeSlash size={18} onClick={toggleShowPassword} />
                </button>
              )}
            </label>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder="Insert your password"
              name="password"
              onKeyDown={handleDown}
              onChange={handlePasswordInput}
              className="w-full rounded-md p-2 shadow"
            />
            <span className="text-right text-xs text-primary hover:text-primaryDark">
              <Link to="/forgotpassword">Did you forget your password?</Link>
            </span>
          </div>
          {wrongInfo && (
            <div className="rounded-md border-success bg-error/30 text-center font-semibold leading-10 text-error">
              <h2>Wrong email or password</h2>
            </div>
          )}
        </div>
        <div className="flex h-1/6 w-1/2 flex-wrap items-center justify-center gap-4 bg-white shadow-sm">
          <input className="" type="checkbox" name="" id="" />
          <span>RE-CAPTCHA</span>
        </div>

        <div className="flex gap-4">
          <Link to="/signup">
            <button className="base-button-lg" type="button">
              SIGN UP
            </button>
          </Link>

          <button
            onClick={handleLogin}
            className="base-button-lg"
            type="button"
          >
            LOG IN
          </button>
        </div>
      </form>
    </div>
  );
}
