"use client";
import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
 const Register = ()=>  {
  const router=useRouter()
  const {storeTokenInLS}=useAuth()
  const [user, setUser] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(user);
    try {
      const response=await fetch("http://localhost:3000/api/auth/register",{
        method:"POST",
        headers:{
          "Content-Type": "application/json",
        },
        body:JSON.stringify(user)
      })
const regis_data=await response.json();
console.log("regis_data", regis_data);

      if(response.ok){
        setUser({
          username: "",
          email: "",
          phone: "",
          password: "",
        })
        toast.success("registration successfull",{classNames:{
          toast:"bg-green-500! text-white! border-black-500!",
          title:"text-white!"
        }})
        {/*//store jwt inlocalstorage

      localStorage.setItem("Token-nextjs",regis_data.token)*/}
      storeTokenInLS(regis_data.token);
      router.push("/")
      }else{
        toast.error(regis_data.error || regis_data.message,{  classNames: {
          toast: "bg-red-500! text-white! border-black-500!",
          title: "text-white!"}})
           console.log("invalid credentials");
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <main>
      <section className="register-page container">

        {/* LEFT IMAGE */}
        <div className="register-image">
          <Image
            src="/images/signup.png"
            alt="Register"
            width={550}
            height={500}
          />
        </div>

        {/* RIGHT FORM */}
        <div className="register-form-box">
          <p className="register-subtitle">Create Account</p>

          <h1>
            Join <span>TechFlow</span>
          </h1>

          <form onSubmit={handleSubmit} autoComplete="off">

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                value={user.username}
                onChange={handleChange}
                placeholder="Enter username"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={user.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={user.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                maxLength={10}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={user.password}
                onChange={handleChange}
                placeholder="Enter password"
                required
                 autoComplete="new-password"
              />
            </div>

            <button type="submit" className="register-btn">
              Register Now
            </button>

          </form>
        </div>

      </section>
    </main>
  );
}
export default Register;