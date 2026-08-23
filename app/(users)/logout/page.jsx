"use client"
import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const LogoutUser = () => {
    const {Logout}=useAuth()
   const router= useRouter()
    useEffect(()=>{
        Logout();
        router.push("/login")
    },[Logout])
    return null;
}
export default LogoutUser;