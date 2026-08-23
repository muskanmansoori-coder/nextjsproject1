"use client"
import { useAuth } from "@/store/auth";
import Image from "next/image";
import Link from "next/link";
import { redirect, usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";



export default function Adminnav() {
   const{token,user,isLoading}=useAuth()
  const pathname= usePathname()
 const router= useRouter()

  
   

 {/*if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!token || !user?.user) {
    router.replace("/");
    return null;
  }

  if (!user?.user?.isAdmin) {
    router.replace("/");
    return null;
  }*/}
  

  return (
    <>
  <header className="container">
            
            <div>
            <ul className="flex items-center gap-8">
                 <li><Link href="/admin/users" className={pathname === "/admin/users" ? "active":"" }>👤 Users</Link>
            </li>
           
     <li>
             <Link href="/admin/contacts" className={pathname === "/admin/contacts" ? "active":"" }>📩 Contact</Link></li>
             
             
             <li>
             <Link href="/" className={pathname === "/" ? "active":"" }>🏠 Home</Link>
             </li>
             <li>
             <Link href="/service" className={pathname === "/service" ? "active":"" }>🛠️ Services</Link>
     </li>
             
           
           
             </ul>
            </div>
         </header>
   
    </>
  );
}