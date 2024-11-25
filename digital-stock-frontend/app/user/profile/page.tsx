'use client'
import { useAuthState } from "@/app/store/AuthState";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const UserProfile = () => {
    const { user } = useAuthState();
    const router = useRouter();

    useEffect(() => {
        console.log("User state in UserProfile: ", user);
        if (!user) {
            console.log("No user found, redirecting to signin");
            router.push('./../auth/signin');
        } else {
            
            console.log("user found")
        }
    }, [user, router]);
    


    return(
        <div className="relative font-[sans-serif] pt-[80px] h-screen">
            <h1 className="px-6 py-6 text-4xl font-extrabold text-gray-800">
        Hello, {user?.username}
      </h1>

        </div>
    )
}
export default UserProfile;