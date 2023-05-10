import { useState } from 'react';
import { GoArrowLeft } from 'react-icons/go';
import { useNavigate } from 'react-router-dom';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { createUserWithEmailAndPassword } from 'firebase/auth';

import { auth } from '../configs/firebase';

export default function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeated, setShowPasswordRepeated] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordReapeated, setPasswordReapeated] = useState('');
  const [createdAccount, setCreatedAccount] = useState(false);

  const navigate = useNavigate();

  function toggleShowPassword(e) {
    e.preventDefault();
    setShowPassword(!showPassword);
  }

  function toggleShowPasswordReapeated(e) {
    e.preventDefault();
    setShowPasswordRepeated(!showPasswordRepeated);
  }

  async function handleNewUser() {
    if (email && password && passwordReapeated) {
      if (password === passwordReapeated) {
        await createUserWithEmailAndPassword(auth, email, password);
        setCreatedAccount(true);
      } else {
        alert("Password doesn't match");
      }
    } else {
      alert('Fields are wrong or empty');
    }
  }

  return (
    <div className="flex min-h-screen w-full items-center justify-center">
      <form
        method="post"
        className="flex h-[500px] w-[400px] flex-col items-center justify-around rounded-md bg-offWhite shadow-sm "
      >
        <h1 className="text-2xl font-bold">Register</h1>
        <div className="flex w-3/4 flex-col flex-wrap gap-4">
          {createdAccount && (
            <div className="rounded-md border-success bg-success/30 text-center font-semibold leading-10 text-success">
              <h2>Created account</h2>
            </div>
          )}
          {!createdAccount && (
            <>
              <div>
                <label htmlFor="email">E-mail</label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Insert a e-mail"
                  className="w-full rounded-md p-2 shadow"
                  type="text"
                  name="email"
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
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Insert a password"
                  className="w-full rounded-md p-2 shadow"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                />
              </div>
              <div>
                <label htmlFor="passwordRepeated">
                  Repeat password
                  {showPasswordRepeated ? (
                    <button className="relative right-0 items-end self-end align-middle text-secundaryDark">
                      <FaRegEye
                        size={18}
                        onClick={toggleShowPasswordReapeated}
                      />
                    </button>
                  ) : (
                    <button className="relative left-0 items-end self-end align-middle text-secundaryDark">
                      <FaRegEyeSlash
                        size={18}
                        onClick={toggleShowPasswordReapeated}
                      />
                    </button>
                  )}
                </label>

                <input
                  onChange={(e) => setPasswordReapeated(e.target.value)}
                  placeholder="Repeat again password"
                  className="w-full rounded-md p-2 shadow"
                  type={showPasswordRepeated ? 'text' : 'password'}
                  name="passwordRepeated"
                />
              </div>
            </>
          )}
        </div>
        <div className="flex gap-4">
          <button
            onClick={() => navigate('/login')}
            className="rounded-md bg-primary px-4 py-2 font-bold text-white shadow"
            type="button"
          >
            BACK
          </button>
          {!createdAccount && (
            <button
              onClick={handleNewUser}
              className="rounded-md bg-primary px-6 py-4 font-bold text-white shadow"
              type="button"
            >
              CREATE ACCOUNT
            </button>
          )}
        </div>
      </form>
    </div>
  );
}
