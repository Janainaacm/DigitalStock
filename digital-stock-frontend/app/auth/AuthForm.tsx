import { Fragment, useEffect, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Login from "./Login";
import Register from "./Register";
import ForgotPassword from "./ForgotPassword";
import { useAuthState } from "../store/AuthState";
import { useRouter } from "next/navigation";

type CurrentPage = "login" | "register" | "forgot-password";

type Props = {
    extraClass?: string;
    children: any;
  };

export default function AuthForm({extraClass, children}: Props) {
  const [currentPage, setCurrentPage] = useState<CurrentPage>("login");
  const {user} = useAuthState()
  const router = useRouter()
  const [open, setOpen] = useState(false);

  const toggleModal = () => setOpen((prev) => !prev);
  
  useEffect(() => {
    if (user && open) {
      setOpen(false); 
      router.push("/user/profile"); 
    }
  }, [user, open, router]);


  const renderComponent = () => {

    if (currentPage === "login") {
      return (
        <Login
          onRegister={() => setCurrentPage("register")}
          onForgotPassword={() => setCurrentPage("forgot-password")}
        />
      );
    }
    if (currentPage === "register") {
      return <Register onLogin={() => setCurrentPage("login")} />;
    }
    return <ForgotPassword onLogin={() => setCurrentPage("login")} />;
  };

  return (
    <>
      <button onClick={toggleModal} className="btn">
        {children}
      </button>
      <Transition show={open} as={Fragment}>
        <Dialog onClose={toggleModal} className="relative z-50">
          <div className="fixed inset-0 bg-black-300 bg-opacity-50" />
          <div className="fixed inset-0 flex items-center justify-center">
            <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95">
              <Dialog.Panel className="w-full max-w-md p-6 bg-white rounded-md">
                {renderComponent()}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
