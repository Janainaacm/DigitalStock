import { useAuthState } from "@/app/store/AuthState";
import { useUserState } from "@/app/store/UserState";
import LoadingIconText from "@/public/icons/LoadingIconText";
import {
  Transition,
  Dialog,
  TransitionChild,
  DialogPanel,
} from "@headlessui/react";
import { useRouter } from "next/navigation";
import { Fragment, useState } from "react";


export default function DeleteUserButton() {
  const [open, setOpen] = useState(false);
  const [validated, setValidated] = useState(false);
  const [verified, setVerified] = useState(false);
  const { verifyPassword } = useAuthState();
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [validation, setValidation] = useState({
    password: true,
  });
  const [isLoading, setIsLoading] = useState(false);
  const { deleteUser } = useUserState();
  const router = useRouter();

  const toggleModal = () => setOpen((prev) => !prev);

  const validateInput = async (password: string) => {
    setIsLoading(true);

    setValidation({
      password: Boolean(password),
    });

    if (!password) {
      setError("Password cannot be empty.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await verifyPassword(password);
      setValidated(response);
      handledelete();
    } catch (error) {
      setIsLoading(false);
      console.error("Error during password validation:", error);
      setValidated(false);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handledelete = () => {
    setValidation({
      password: Boolean(password),
    });

    if (!password) {
      setError("Password is incorrect.");
      return;
    }

    deleteUser();
    router.push("/");
  };

  const renderComponent = () => {
    if (!verified) {
      return (
        <div className="bg-[#F5F5F5] p-8 flex flex-col items-center">
          <h3 className="text-xl pt-2 font-bold">
            Do you want to delete your account?
          </h3>
          <div className="flex justify-between w-full px-14">
            <button
              className="border-2 py-3 px-8 text-lg rounded-md text-gray-700 font-semibold bg-gray-300 hover:bg-gray-700 hover:text-gray-300 hover:scale-[1.1] transition-all duration-400"
              onClick={() => setVerified(true)}
            >
              YES
            </button>
            <button
              className="border-2 py-3 px-8 text-lg rounded-md text-white font-semibold bg-gray-700 hover:bg-gray-600 hover:scale-[1.1] transition-all duration-400"
              onClick={toggleModal}
            >
              NO
            </button>
          </div>
        </div>
      );
    } else if (verified && !validated) {
      return (
        <div className="bg-[#F5F5F5] p-8 flex flex-col items-center">
          <h3 className="text-xl py-2 font-bold">Are you sure?</h3>
          <p className="text-sm pb-3 text-gray-600">Verify with password</p>
          <div className="group relative w-full py-6 flex items-center">
            <input
              name="password"
              type={showPassword ? "text" : "password"}
              onChange={(e) => setPassword(e.target.value)}
              required
              className={`w-full bg-[#F5F5F5] text-sm border-b px-2 py-3 outline-none transition-all duration-400 ${
                validation.password
                  ? "border-gray-300 focus:border-blue-600 group-hover:border-black-600 group-hover:placeholder-black-600"
                  : "border-red-600 placeholder-red-600"
              }`}
              placeholder="Enter password"
            />
            <svg
              fill={validation.password ? "#bbb" : "#EF4444"}
              stroke={validation.password ? "#bbb" : "#DC2626"}
              className="w-4 h-4 absolute right-4 cursor-pointer group-hover:fill-black-600 group-hover:stroke-black-600"
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
          <div className="h-5">
            <p className="text-red-600 text-sm text-center">{error}</p>
          </div>
          <div className="mt-3 w-full">
            <button
              type="submit"
              onClick={() => validateInput(password)}
              className="w-full py-3 px-4 tracking-wider flex justify-center text-sm rounded-md text-white bg-gray-700 hover:bg-gray-800 focus:outline-none transition-all duration-800"
            >
              {isLoading ? <LoadingIconText /> : "Delete"}
            </button>
          </div>
        </div>
      );
    } else if (isLoading) {
      return (
        <div>
          <LoadingIconText />
        </div>
      );
    }
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="text-gray-800 text-sm flex items-center hover:bg-gray-100 rounded-md px-4 py-2 transition-all"
      >
        <svg
          fill="currentColor"
          className="w-[18px] h-[18px] mr-3"
          viewBox="0 0 512 512"
        >
          <path
            d="M437.02 74.98C388.668 26.63 324.379 0 256 0S123.332 26.629 74.98 74.98C26.63 123.332 0 187.621 0 256s26.629 132.668 74.98 181.02C123.332 485.37 187.621 512 256 512s132.668-26.629 181.02-74.98C485.37 388.668 512 324.379 512 256s-26.629-132.668-74.98-181.02zM111.105 429.297c8.454-72.735 70.989-128.89 144.895-128.89 38.96 0 75.598 15.179 103.156 42.734 23.281 23.285 37.965 53.687 41.742 86.152C361.641 462.172 311.094 482 256 482s-105.637-19.824-144.895-52.703zM256 269.507c-42.871 0-77.754-34.882-77.754-77.753C178.246 148.879 213.13 114 256 114s77.754 34.879 77.754 77.754c0 42.871-34.883 77.754-77.754 77.754zm170.719 134.427a175.9 175.9 0 0 0-46.352-82.004c-18.437-18.438-40.25-32.27-64.039-40.938 28.598-19.394 47.426-52.16 47.426-89.238C363.754 132.34 315.414 84 256 84s-107.754 48.34-107.754 107.754c0 37.098 18.844 69.875 47.465 89.266-21.887 7.976-42.14 20.308-59.566 36.542-25.235 23.5-42.758 53.465-50.883 86.348C50.852 364.242 30 312.512 30 256 30 131.383 131.383 30 256 30s226 101.383 226 226c0 56.523-20.86 108.266-55.281 147.934zm0 0"
            data-original="#000000"
          />
        </svg>
        <span>Delete profile</span>
      </button>
      <Transition show={open} as={Fragment}>
        <Dialog onClose={toggleModal} className="relative z-[999]">
          <div className="fixed inset-0 bg-black-300 bg-opacity-50" />
          <div className="fixed inset-0 flex items-center justify-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-md p-6 bg-white rounded-md">
                {renderComponent()}
              </DialogPanel>
            </TransitionChild>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
