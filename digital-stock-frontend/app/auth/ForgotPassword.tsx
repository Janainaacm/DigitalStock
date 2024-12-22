import { useRouter } from "next/navigation";
import { useState } from "react";

type ForgotPasswordProps = {
  onLogin: () => void;
};

export default function ForgotPassword({ onLogin }: ForgotPasswordProps) {
  const [email, setEmail] = useState("");
  const [validation, setValidation] = useState({
    email: true,
  });
  const router = useRouter();

  const handleResetPassword = () => {
    
    setValidation({
      email: Boolean(email),
    });

    if (!email) {
      return;
    }

    setEmail("");
    router.push("https://www.youtube.com/watch?v=GDvLkUEg-I4");
  };

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleResetPassword();
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault(); 
            handleResetPassword(); 
          }
        }}
        className="md:col-span-2 w-full py-3 sm:px-16 bg-white"
      >
        <div className="mb-7">
          <h3 className="text-gray-800 text-3xl py-6 font-bold">
            Reset password
          </h3>
        </div>

        <div className="space-y-6">
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
        </div>

        <div className="mt-3 py-5">
            <button
              type="button"
              onClick={() => handleResetPassword()}
              className="w-full py-3 px-4 tracking-wider text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none transition-all duration-800"
            >
              Reset password
            </button>
          </div>
          <div className="-mt-5">
        <button
          onClick={onLogin}
          className="w-full py-3 px-4 tracking-wider text-blue-400 font-bold text-sm hover:text-blue-600 focus:outline-none transition-all duration-800"
        >
          Back to log in
        </button>
      </div>
      </form>
    </div>
  );
}
