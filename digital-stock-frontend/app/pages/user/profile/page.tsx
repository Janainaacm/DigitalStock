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
            router.push('../auth/signin');
        } else {
            console.log("user found")
        }
    }, [user, router]);
    


    return(
        <h1>user profile</h1>
    )
}
export default UserProfile;