/*
  LogIn: used in auth page
*/

// react
import { useRouter } from 'next/navigation';
import { useState } from 'react';

// google auth
import { auth } from '@/firebase/clientApp';
import { errorMsg } from '@/firebase/authErrors';

import {
  signInWithPopup,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from 'firebase/auth';

// icons
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

// components
import TextField from '@components/common/TextField';
import SubmitBtn from '@components/common/SubmitBtn';
import Alert from '@components/common/Alert';

export default function LogIn({
  changeScreen,
}: {
  changeScreen: (screen: number) => void;
}) {
  const googleAuth = new GoogleAuthProvider();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [authError, setAuthError] = useState('');

  const updateEmail = (val: string) => {
    setEmail(val);
    setEmailError('');
    setAuthError('');
  };

  const updatePassword = (val: string) => {
    setPassword(val);
    setPasswordError('');
    setAuthError('');
  };

  const loginGoogle = async () => {
    await signInWithPopup(auth, googleAuth).catch((error) => {
      var msg =
        errorMsg[error.code.replace('auth/', '') as keyof typeof errorMsg];
      setAuthError(msg ?? 'User Not Found');
    });
  };

  const validate = () => {
    var allgood = true;
    if (!email) {
      setEmailError('Required');
      allgood = false;
    }
    if (!email) {
      setEmailError('Required');
      allgood = false;
    } else if (
      !email.match(
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      )
    ) {
      setEmailError('Enter valid email');
      allgood = false;
    }
    if (!password) {
      setPasswordError('Required');
      allgood = false;
    }
    return allgood;
  };
  const loginManually = async () => {
    if (!validate()) return;
    await signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // signed in.
        router.push('/dev/home');
      })
      .catch((error) => {
        var msg =
          errorMsg[error.code.replace('auth/', '') as keyof typeof errorMsg];
        setAuthError(msg ?? 'Incorrect Username or Password');
      });
  };
  return (
    <div className="bg-white shadow rounded-3xl w-fit p-8">
      <p
        tabIndex={0}
        aria-label="Login to your account"
        className="text-2xl font-extrabold leading-6 text-gray-800">
        Login to your account
      </p>
      <p className="text-sm mt-4 font-medium leading-none text-gray-500">
        Dont have an account?{' '}
        <span
          tabIndex={0}
          role="link"
          aria-label="Sign up here"
          className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer"
          onClick={() => {
            setAuthError('');
            changeScreen(1);
          }}>
          {' '}
          Sign up here
        </span>
      </p>
      {authError.length > 0 && (
        <Alert alertType="danger" className="mx-auto max-w-[350px]">
          {authError}
        </Alert>
      )}
      <div className="min-w-[350px]">
        <TextField
          label="Email"
          setValue={updateEmail}
          name="email"
          type="text"
          autoComplete="username"
          errorMsg={emailError}
          className="mt-3"
        />

        <TextField
          label="Password"
          setValue={updatePassword}
          name="current-password"
          autoComplete="current-password"
          type="password"
          eye={true}
          errorMsg={passwordError}
          className="mt-3"
        />
      </div>
      <div
        tabIndex={0}
        role="link"
        aria-label="Sign up here"
        className="text-sm font-medium leading-none underline text-gray-800 cursor-pointer mt-3 w-fit"
        onClick={() => {
          setAuthError('');
          changeScreen(2);
        }}>
        {' '}
        Forgot Password?
      </div>

      <div className="w-full flex items-center">
        <SubmitBtn label="Log In" onClick={loginManually} className="mt-3" />
      </div>

      <div className="w-full flex items-center justify-between py-5">
        <hr className="w-full bg-gray-400" />
        <p className="text-base font-medium leading-4 px-2.5 text-gray-400">
          OR
        </p>
        <hr className="w-full bg-gray-400  " />
      </div>

      <div className="flex flex-row items-center justify-center w-full">
        <button
          aria-label="Continue with google"
          role="button"
          onClick={loginGoogle}
          className="transition-all duration-500 ease-in-out hover:bg-zinc-800 text-gray-900 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-700 py-3.5 px-4 border rounded-lg border-gray-700 flex items-center w-full">
          <FcGoogle className="h-8 w-auto" />
          <p className="text-sm font-medium leading-4 px-2.5 ">
            Continue with Google
          </p>
        </button>
      </div>
    </div>
  );
}
