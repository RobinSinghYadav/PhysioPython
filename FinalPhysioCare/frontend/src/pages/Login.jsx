import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../context/AppContext';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const countryCodes = [
  { code: '+91', country: 'India' },
  { code: '+1', country: 'United States' },
  // Add other country codes here
];

const Login = () => {
  const { backendUrl, token, setToken } = useContext(AppContext);
  const navigate = useNavigate();

  const [state, setState] = useState('Sign Up');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [countryCode, setCountryCode] = useState('+91');
  const [otp, setOtp] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      if (state === 'Sign Up') {
        const { data } = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          password,
          email,
          phone: countryCode + mobile,
        });
        if (data.success) {
          toast.success('Account created! Check your email for the OTP.');
          localStorage.setItem('token',data.token)
          setToken(data.token)
          setUserEmail(email); // Save the email for OTP verification
          setState('VerifyOTP');
        } else {
          toast.error(data.message);
        }
      } else if (state === 'Login') {
        const { data } = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });
        if (data.success) {
          localStorage.setItem('token', data.token);
          setToken(data.token);
          toast.success('Login Successful');
        } else {
          toast.error(data.message);
        }
      } else if (state === 'VerifyOTP') {
        const { data } = await axios.post(`${backendUrl}/api/user/verifyEmail`, {
          code: otp,
        });
        if (data.success) {
          toast.success('Email verified successfully. Logging in...');
          localStorage.setItem('token', data.token);
          setToken(data.token);
          navigate('/');
        } else {
          toast.error(data.message);
        }
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Internal server error');
    }
  };

  useEffect(() => {
    if (token) {
      navigate('/');
    }
  }, [token]);

  return (
    <form
      className="min-h-[80vh] flex items-center justify-center"
      onSubmit={onSubmitHandler}
    >
      <div className="flex flex-col gap-4 p-8 min-w-[340px] sm:min-w-96 border rounded-xl bg-white text-zinc-600 text-sm shadow-md">
        {/* Title */}
        <p className="text-xl font-semibold text-center">
          {state === 'Sign Up'
            ? 'Create Account'
            : state === 'Login'
            ? 'Login'
            : 'Verify OTP'}
        </p>
        <p className="text-sm text-center mb-4">
          {state === 'Sign Up'
            ? 'Please create an account to book your appointment.'
            : state === 'Login'
            ? 'Please login to book your appointment.'
            : 'Enter the OTP sent to your email.'}
        </p>

        {/* Forms */}
        {state === 'VerifyOTP' ? (
          <>
            <div className="flex flex-col">
              <label className="text-base font-medium">OTP</label>
              <input
                className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="text"
                placeholder="Enter OTP"
                required
                onChange={(e) => setOtp(e.target.value)}
                value={otp}
              />
            </div>
          </>
        ) : (
          <>
            {state === 'Sign Up' && (
              <div className="flex flex-col">
                <label className="text-base font-medium">Full Name</label>
                <input
                  className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  type="text"
                  placeholder="Enter your full name"
                  required
                  onChange={(e) => setName(e.target.value)}
                  value={name}
                />
              </div>
            )}

            <div className="flex flex-col">
              <label className="text-base font-medium">Email</label>
              <input
                className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="email"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            </div>

            <div className="flex flex-col">
              <label className="text-base font-medium">Password</label>
              <input
                className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                type="password"
                placeholder="Enter your password"
                required
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
            </div>

            {state === 'Sign Up' && (
              <div className="flex flex-col">
                <label className="text-base font-medium">Mobile No.</label>
                <div className="flex items-center gap-2">
                  <select
                    className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={countryCode}
                    onChange={(e) => setCountryCode(e.target.value)}
                  >
                    {countryCodes.map((country) => (
                      <option key={country.code} value={country.code}>
                        {`${country.code} (${country.country})`}
                      </option>
                    ))}
                  </select>
                  <input
                    className="border p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    type="text"
                    placeholder="Enter your mobile number"
                    required
                    onChange={(e) =>
                      /^\d*$/.test(e.target.value) &&
                      setMobile(e.target.value.slice(0, 10))
                    }
                    value={mobile}
                  />
                </div>
              </div>
            )}
          </>
        )}

        {/* Submit Button */}
        <button
          className="bg-blue-500 text-white font-medium p-2 rounded-md hover:bg-blue-600 transition-colors"
          type="submit"
        >
          {state === 'Sign Up'
            ? 'Create Account'
            : state === 'Login'
            ? 'Login'
            : 'Verify OTP'}
        </button>

        {/* Toggle Button */}
        {state !== 'VerifyOTP' && (
          <button
            className="text-blue-500 font-medium p-2 mt-2"
            type="button"
            onClick={() =>
              setState(state === 'Sign Up' ? 'Login' : 'Sign Up')
            }
          >
            {state === 'Sign Up'
              ? 'Already have an Account? Switch to Login'
              : 'Switch to Sign Up'}
          </button>
        )}
      </div>
    </form>
  );
};

export default Login;
