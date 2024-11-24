'use client'

import { useAppState } from "@/app/store/BackendAPIState";


const WishlistPopUp = () => {
    const {wishlist} = useAppState();






    return (
        <div className="relative font-sans">
      <div className="max-w-[300px] rounded bg-blue-50 border-b border-r border-black-500 border-l shadow-[0_5px_15px_-6px_rgba(0,0,0,0.2)] absolute top-14 before:w-4 before:h-4 before:rotate-45 before:bg-blue-400 before:z-[-1] before:absolute before:-top-1.5 before:left-0  before:right-0 before:mx-auto">



        </div>
    </div>    

    );
}

export default WishlistPopUp;