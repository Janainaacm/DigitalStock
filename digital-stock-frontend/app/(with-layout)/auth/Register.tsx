import { useState } from "react";
import { useAuthState } from "../../store/AuthState";

type RegisterProps = {
  onLogin: () => void;
};

export default function Register({ onLogin }: RegisterProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [checkbox, setCheckbox] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);
  const [loading, setLoading] = useState(false);
  const { registerUser } = useAuthState();


  const [validation, setValidation] = useState({
    username: true,
    email: true,
    password: true,
    checkbox: true,
  });

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = async () => {
    setLoading(true)
    setTouched(true);

    setValidation({
      username: Boolean(username),
      email: Boolean(email),
      password: Boolean(password),
      checkbox: Boolean(checkbox),
    });

    if (!username || !password || !email || !checkbox) {
      if (!username || !password || !email) {
        setError("All fields are required.");
        setLoading(false)
        return;
      }

      if (!checkbox) {
        setError("Terms and conditions must be accepted");
        setLoading(false)
        return;
      }
    }

    if (password.length < 7) {
      setError("Password must be at least 7 characters");
      setLoading(false)
        return;
    }

    if (username.length < 4 || username.length > 32) {
      setError("Username must be between 4-32 characters");
      setLoading(false)
      return;
    }

    try {
      await registerUser(username, email, password);
      setUsername("");
      setPassword("");
      setEmail("");
      setLoading(false)
    } catch (err) {
      console.error("Registration error:", err);
      setLoading(false)
      if (err instanceof Error) {
        setError(err.message || "Failed to register user. Please try again.");
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
            handleRegister();
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault(); 
              handleRegister(); 
            }
          }}
          className="md:col-span-2 w-full py-3 sm:px-16 bg-white"
        >
          <div className="mb-7">
            <h3 className="text-gray-800 text-3xl py-6 font-bold">
              Create an account
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
                  className={`w-full bg-white text-sm border-b px-2 py-3 outline-none transition-all duration-400 ${
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
                  name="email"
                  type="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full bg-white text-sm border-b px-2 py-3 outline-none transition-all duration-400 ${
                    validation.email
                      ? "border-gray-300 focus:border-blue-600 hover:border-black-600 hover:placeholder-black-600"
                      : "border-red-600 placeholder-red-600"
                  }`}
                  placeholder="Enter email"
                />
                <svg
                  fill={validation.email ? "#bbb" : "#EF4444"}
                  stroke={validation.email ? "#bbb" : "#DC2626"}
                  className="w-4 h-4 absolute right-4"
                  viewBox="0 0 682.667 682.667"
                >
                  <defs>
                    <clipPath id="a" clipPathUnits="userSpaceOnUse">
                      <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                    </clipPath>
                  </defs>
                  <g
                    clipPath="url(#a)"
                    transform="matrix(1.33 0 0 -1.33 0 682.667)"
                  >
                    <path
                      fill="none"
                      strokeMiterlimit="10"
                      strokeWidth="40"
                      d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                      data-original="#000000"
                    ></path>
                    <path
                      d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                      data-original="#000000"
                    ></path>
                  </g>
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
                  className={`w-full bg-white text-sm border-b px-2 py-3 outline-none transition-all duration-400 ${
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

            <div className="flex items-center pt-3 pb-3">
              <input
                type="checkbox"
                className={`appearance-none w-4 h-4 border-2 rounded-sm relative checked:bg-blue-600 checked:border-blue-600 ${
                  touched && !validation.checkbox
                    ? "border-red-600"
                    : "border-gray-400"
                } before:content-['✓'] before:text-white before:absolute before:opacity-0 before:top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 checked:before:opacity-100`}
                onChange={() => setCheckbox(!checkbox)}
              />

              <label
                htmlFor="remember-me"
                className={`ml-3 block text-sm ${
                  touched && !validation.checkbox
                    ? "text-red-600"
                    : "text-gray-600"
                }`}
              >
                I accept the <span className="text-blue-600 font-semibold hover:underline ml-1">Terms and Conditions</span>
              </label>
            </div>
          </div>

          <div className="h-5">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>

          <div className="mt-3">
            <button
              type="button"
              onClick={() => handleRegister()}
              className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none transition-all duration-800"
              disabled={loading}
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div
                      className="inline-block h-5 w-5 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                      role="status"
                    ></div>
                    <p className="ml-3">Loading...</p>
                  </div>
                ) : (
                  "Register User"
                )}
            </button>
          </div>
          <p className="text-gray-800 text-sm mt-5 text-center">
            Already have an account?{" "}
            <button
              onClick={onLogin}
              className="text-blue-600 font-semibold hover:underline ml-1"
            >
              Login here
            </button>
          </p>
        </form>
      <div>
      </div>
    </div>
  );
}
