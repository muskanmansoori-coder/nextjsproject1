"use client"
import Image from "next/image"
import Link from "next/link"
import "./Navbar.css"

import { usePathname } from "next/navigation"
import { useAuth } from "@/store/auth"

export const Navbar = () => {
   const {isLogin}= useAuth()
const pathname= usePathname()
    return(
        <header className="container  flex items-center justify-between navbar">
            <div>
                <h1 className="logo"><Link href="/">TechFlow</Link></h1>
            </div>
           <div>
           <ul className="flex items-center gap-8">
                <li><Link href="/" className={pathname === "/" ? "active":"" }>Home</Link>
           </li>
           <li>
            <Link href="/about" className={pathname === "/about" ? "active":"" }>About</Link>
            </li>
            <li>
            <Link href="/service" className={pathname === "/service" ? "active":"" }>Services</Link>
    </li>
    <li>
            <Link href="/contact" className={pathname === "/contact" ? "active":"" }>Contact</Link></li>
            
            {isLogin ? (
            <li>
              <Link
                href="/logout"
                className={pathname === "/logout" ? "active" : ""}
              >
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li>
                <Link
                  href="/login"
                  className={pathname === "/login" ? "active" : ""}
                >
                  Login
                </Link>
              </li>

              <li>
                <Link
                  href="/register"
                  className={pathname === "/register" ? "active" : ""}
                >
                  Register
                  </Link>
              </li>
            </>
          )}
            
          
          
            </ul>
           </div>
        </header>
    )
}