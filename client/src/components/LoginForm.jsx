import React, { useState } from "react";
import { Link } from "react-router-dom";
import { loginUser, registerUser } from "../services/authApi";

const LoginForm = ({ onLoginSuccess }) => {
  const [isRegister, setIsRegister] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const { data } = await registerUser(username, password);
      setIsRegister(false);
      setMessage(data.message);
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setError("");
    } catch (error) {
      console.log("The error is ", error.message);
      setError("Something went worng when registration");
      setUsername("");
      setPassword("");
      setConfirmPassword("");
      setMessage("");
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await loginUser(username, password);
      setMessage(data.message);
      setUsername("");
      setPassword("");
      setError("");
      onLoginSuccess(data);
    } catch (error) {
      console.log("The error is ", error.message);
      setError("Invalid user credentals");
      setUsername("");
      setPassword("");
      setMessage("");
    }
  };

  const handleRegisterToggle = () => {
    setIsRegister(!isRegister);
    setError("");
    setMessage("");
  };

  return (
    <form
      onSubmit={isRegister ? handleRegister : handleLogin}
      className="bg-white rounded-lg shadow-md w-full max-w-sm max-auto"
    >
      <div className="pt-6">
        <h2 className="text-3xl text-center font-extralight">
          {isRegister ? "Create Account" : "Login"}
        </h2>
      </div>
      <hr className="text-gray-200 mt-6 mb-6" />
      <p className="text-center text-gray-600 text-lg font-light">
        {isRegister
          ? "Looks like you are new here!"
          : " We are glad to see you again!"}
      </p>
      <div className="p-6">
        <div className="mb-4">
          <label htmlFor="username" className="text-gray-600 text-sm">
            Username
          </label>
          <input
            type="text"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded mt-2 "
            placeholder="Enter your username"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="text-gray-600 text-sm">
            Password
          </label>
          <input
            type="password"
            label="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded mt-2 "
            placeholder="Enter your password"
            required
          />
        </div>
        {isRegister ? (
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="text-gray-600 text-sm">
              Confirm Password
            </label>
            <input
              type="password"
              label="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-2 border rounded mt-2 "
              placeholder="Enter your password again"
              required
            />
          </div>
        ) : (
          ""
        )}
        {error && <p className="text-red-500 text-sm mb-3">{error}</p>}
        {message && <p className="text-green-500 text-sm mb-3">{message}</p>}

        <button className="w-full bg-blue-500 text-white py-2 rounded-md ">
          {isRegister ? " Register" : "Login"}
        </button>
        <div>
          <p className="pt-4 text-center text-gray-600 text-sm">
            {isRegister
              ? "Already have an account ?"
              : " Don't have an account ?"}
            <Link to="" onClick={handleRegisterToggle}>
              {isRegister ? " Login" : " Create Account"}
            </Link>
          </p>
        </div>
      </div>
    </form>
  );
};

export default LoginForm;
