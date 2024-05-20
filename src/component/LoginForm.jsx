import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { getUserDetails } from '../redux/slice/authSlice';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();

    const loginObj = {
      email: email,
      password: password
    };

    fetch("http://localhost:4000/api/v1/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(loginObj)
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Network response was not ok ' + res.statusText);
        }
        return res.json();
      })
      .then((data) => {
        console.log('Success:', data);
        dispatch(getUserDetails(data.user));
        if (data.user.role === "USER") {
          navigate("/");
        }

        if (data.user.role === "ADMIN") {
          navigate("/dashboard");
        }


      })
      .catch((error) => {
        console.error('Error:', error);
        setErrorMessage('Failed to log in. Please check your credentials and try again.');
      });
  };

  return (
    <div className="bg-gray-50 font-[sans-serif] text-[#000]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
          <a href="javascript:void(0)">
            <h1 className="text-center text-3xl font-extrabold"><b>F</b>ood <b>O</b>rdering</h1>
          </a>
          <center><h2>
            Log in to your account
          </h2></center>
          <form className="mt-10 space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-blue-500"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-blue-500"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <label htmlFor="remember-me" className="ml-3 block text-sm">
                  Remember me
                </label>
              </div>
              <div>
                <a href="javascript:void(0);" className="text-sm text-blue-600 hover:text-blue-500">
                  Forgot Password?
                </a>
              </div>
            </div>
            {errorMessage && (
              <div className="text-red-500 text-sm">
                {errorMessage}
              </div>
            )}
            <div className="!mt-10">
              <button
                type="submit"
                className="w-full py-2.5 px-4 text-sm rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                Log in
              </button>
            </div>
          </form>
          <div className="mt-4 text-center">
            <span className="text-sm">Don't have an account? </span>
            <Link to="/signup" className="text-blue-600 hover:text-blue-500 text-sm">
              Sign up now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
