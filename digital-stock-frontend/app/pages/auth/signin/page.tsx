'use client';

import GoBackButton from "@/app/globalComponents/Functions/GoBackButton";
import { useAuthState } from "../../../store/AuthState";
import { useState } from "react";

export default function SignInPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { signIn } = useAuthState();


  const [validation, setValidation] = useState({
    username: true,
    password: true,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {

    setValidation({
      username: Boolean(username),
      password: Boolean(password),
    });

    if (!username || !password) {
        setError("All fields are required.");
        return;
      
    }

    try {
      await signIn(username, password);
      setSuccessMessage("Logged in user successfully!");
      setUsername("");
      setPassword("");
    } catch (err) {
      console.error("Login error:", err);

      if (err instanceof Error) {
        setError(err.message || "Failed to login user. Please try again.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    }
  };
    return (
        <div className="font-[sans-serif] bg-white flex items-center justify-center md:h-screen p-4">
          
      <div className="shadow-[0_2px_16px_-3px_rgba(6,81,237,0.3)] max-w-6xl max-md:max-w-lg rounded-md p-6">

        <div className="grid md:grid-cols-2 items-center gap-8">
          <div className="max-md:order-1 lg:min-w-[450px]">
            <img src="https://images.unsplash.com/photo-1491933382434-500287f9b54b?q=80&w=2864&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="lg:w-11/12 w-full object-cover" alt="login-image" />
          </div>

          <form className="md:max-w-md w-full mx-auto">
            <div className="relative">
              <div className="absolute bottom-12 right-1">
               <GoBackButton />
              </div>
            </div>

            <div className="mb-12">
              <h3 className="text-4xl font-extrabold text-blue-600">Sign in</h3>
            </div>

            <div>
              <div className="relative flex items-center">
                <input 
                name="username" 
                type="text" 
                required 
                onChange={(e) => setUsername(e.target.value)}
                className={`w-full text-sm border-b px-2 py-3 outline-none transition-all duration-400 ${
                  validation.username
                    ? "border-gray-300 focus:border-blue-600 hover:border-black-600 hover:placeholder-black-600"
                    : "border-red-600 placeholder-red-600"
                }`}                placeholder="Username" />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill={validation.username ? "#bbb" : "#DC2626"}
                  stroke={validation.username ? "#bbb" : "none"}
                  className="w-4 h-4 absolute right-2"
                  viewBox="0 0 24 24"
                >
                  <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                  <path
                    d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="mt-8">
              <div className="relative flex items-center">
                <input 
                name="password" 
                type={showPassword ? "text" : "password"} 
                onChange={(e) => setPassword(e.target.value)}
                required
                className={`w-full text-sm border-b px-2 py-3 outline-none transition-all duration-400 ${
                   validation.password
                    ? "border-gray-300 focus:border-blue-600 hover:border-black-600 hover:placeholder-black-600"
                     : "border-red-600 placeholder-red-600"
                }`}
                placeholder="Enter password" 
                  />
                <svg
                  fill={validation.password ? "#bbb" : "#EF4444"}
                  stroke={validation.password ? "#bbb" : "#DC2626"}
                  className="w-4 h-4 absolute right-2 cursor-pointer"
                  viewBox="0 0 128 128"
                  onClick={togglePasswordVisibility}
                  aria-label="Toggle password visibility"
                >
                  <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
              <div>
                <a href="jajvascript:void(0);" className="text-blue-600 font-semibold text-sm hover:underline">
                  Forgot Password?
                </a>
              </div>
            </div>

            <div className="h-5">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>

            <div className="mt-5">
              <button type="button" 
              className="w-full shadow-xl py-2.5 px-5 text-sm font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
              onClick={handleRegister}
              >
                Sign in
              </button>
              <p className="text-gray-800 text-sm text-center mt-6">Don't have an account <a href="./register" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</a></p>
              
            </div>
            
          </form>
          
        </div>
      </div>
    </div>
    )
}