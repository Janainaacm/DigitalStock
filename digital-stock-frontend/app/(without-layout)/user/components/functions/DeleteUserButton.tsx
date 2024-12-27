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
        className="px-8 py-1 mr-12 border mt-4 tracking-wide font-semibold text-red-700 border-red-600 bg-gray-50 hover:tracking-widest hover:scale-[1.1] hover:text-red-500 hover:border-red-400 hover:bg-white hover:shadow-md transition-all duration-400"

      >
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
