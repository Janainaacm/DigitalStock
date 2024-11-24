const LoginPopUp = () => {
  return (
    <div className="relative font-sans">
      <div 
        className="max-w-[300px] rounded bg-blue-50 border-b border-r border-black-500 border-l shadow-[0_5px_15px_-6px_rgba(0,0,0,0.2)] absolute top-14 before:w-4 before:h-4 before:rotate-45 before:bg-blue-400 before:z-[-1] before:absolute before:-top-1.5 before:left-0  before:right-0 before:mx-auto">
        
        <div className="flex items-center flex-col bg-blue-400 p-3 border-b border-black-500 rounded">
        <svg
                width="20px"
                height="20px"
                viewBox="0 0 24 24"
                className="fill-[#007bff]"
              >
                <circle cx="10" cy="7" r="6" data-original="#000000" />
                <path
                  d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z"
                  data-original="#000000"
                />
              </svg>
          <h3 className=" text-base text-white font-semibold">
            Please log in
          </h3>
        </div>

        <div className="flex items-center flex-col p-4">
        <p className="text-xs text-center text-black mb-2">
          Sign in to existing account
        </p>
            <button
            className="px-14 py-2 border border-black-500 bg-blue-400 hover:bg-blue-500 text-white text-md font-semibold rounded transition-all duration-400"
            >
                Log in
            </button>

        <p className="text-xs text-center text-black mt-4">
          Or are you a new user?
        </p>
        <p className="text-xs text-center text-black mt-1">
          Register now!
        </p>

        <button
            className="px-12 mt-2 py-2 border border-black-500 bg-blue-400 hover:bg-blue-500 text-white text-md font-semibold rounded transition-all duration-400"
            >
                Register
            </button>
        
        </div>
      </div>
      <button
        type="button"
        className="px-6 py-2.5 ml-24 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-blue-600 hover:bg-blue-700 active:bg-blue-600"
      >
        Popover
      </button>
    </div>
  );
};
export default LoginPopUp;
