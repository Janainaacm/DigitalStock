import { useState } from "react";
import { useAuthState } from "../store/AuthState";

type LoginProps = {
  onRegister: () => void;
  onForgotPassword: () => void;
};

export default function Login({ onRegister, onForgotPassword }: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { signIn } = useAuthState();


  const [validation, setValidation] = useState({
    username: true,
    password: true,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleLogin = async () => {

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
<div>
      <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); 
              handleLogin(); 
            }
          }}
          className="md:col-span-2 w-full py-3 sm:px-16 bg-[#F5F5F5]"
        >
          <div className="mb-7">
            <h3 className="text-gray-800 text-3xl py-6 font-bold">
              Log in
            </h3>
          </div>

          <div className="space-y-6">
            <div>
              <div className="relative flex items-center">
                <input
                  name="username"
                  type="text"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  className={`w-full bg-[#F5F5F5] text-sm border-b px-2 py-3 outline-none transition-all duration-400 ${
                    validation.username
                      ? "border-gray-300 focus:border-blue-600 hover:border-black-600 hover:placeholder-black-600"
                      : "border-red-600 placeholder-red-600"
                  }`}
                  placeholder="Enter username"
                />
                <svg
                  fill={validation.username ? "#bbb" : "#DC2626"}
                  stroke={validation.username ? "#bbb" : "none"}
                  className="w-4 h-4 absolute right-4"
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

            <div>
              <div className="relative flex items-center">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className={`w-full bg-[#F5F5F5] text-sm border-b px-2 py-3 outline-none transition-all duration-400 ${
                    validation.password
                      ? "border-gray-300 focus:border-blue-600 hover:border-black-600 hover:placeholder-black-600"
                      : "border-red-600 placeholder-red-600"
                  }`}
                  placeholder="Enter password"
                />
                <svg
                  fill={validation.password ? "#bbb" : "#EF4444"}
                  stroke={validation.password ? "#bbb" : "#DC2626"}
                  className="w-4 h-4 absolute right-4 cursor-pointer"
                  viewBox="0 0 128 128"
                  onClick={togglePasswordVisibility}
                  aria-label="Toggle password visibility"
                >
                  <path
                    d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                    data-original="#000000"
                  ></path>
                </svg>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
              <div>
                <button 
                onClick={onForgotPassword} 
                className="text-blue-600 font-semibold text-sm hover:underline">
                  Forgot Password?
                </button>
              </div>
            </div>
          </div>

          <div className="h-5">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>

          <div className="mt-3">
            <button
              type="submit"
              onClick={() => handleLogin()}
              className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none transition-all duration-800"
            >
              Log in
            </button>
          </div>
          <div className="mt-5">
              <p className="text-gray-800 text-sm text-center">Don´t have an account? 
              <button
                onClick={onRegister}
              className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</button></p>
              
            </div>
        </form>
    </div>
  );
}


 