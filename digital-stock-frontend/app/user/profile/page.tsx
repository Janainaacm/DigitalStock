'use client'
import { useAuthState } from "@/app/store/AuthState";


const UserProfile = () => {
    const { user } = useAuthState();

    
    


    return(
        <div className="relative font-[sans-serif] pt-[80px] h-screen">
            <h1 className="px-6 py-6 text-4xl font-extrabold text-gray-800">
        Hello, {user?.username}
      </h1>

        </div>
    )
}
export default UserProfile;