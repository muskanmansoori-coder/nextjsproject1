"use client"
import { toast } from "sonner";
import Image from "next/image";
import { useState } from "react";
import { useAuth } from "@/store/auth";
const  contact= () => {
  const {user}=useAuth();
  const[contData, setContData]=useState(true)
  const [form, setForm] = useState({
    username: "",
    email: "",
    message: "",
  });
  if(user && contData){
    setForm({
      username:user.user.username,
      email: user.user.email,
      message: "",
    });
    setContData(false)
  }

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(form);

    try {
      const response=await fetch("http://localhost:3000/api/form/contact",{
        method:"POST",
        headers:{
         "Content-Type":"application/json"
        },
        body:JSON.stringify(form),
      })
      const cont_data=await response.json();
      if(response.ok){
setForm({
  username: "",
    email: "",
    message: "",
});
toast.success("mseg sent successfully",{classNames:{
  toast:"bg-green-500! text-white! border-black-500!",
  title:"text-white!"
}})
      }else{
        toast.error(cont_data.error || cont_data.message,{classNames:{
          toast:"bg-red-500! text-white! border-black-500!",
          title:"text-white!"
        }})
      }
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <main>
      <section className="contact-page container">

        {/* LEFT IMAGE */}
        <div className="contact-image">
          <Image
            src="/images/nextcontact.png"
            alt="Contact us"
            width={550}
            height={500}
          />
        </div>

        {/* RIGHT FORM */}
        <div className="contact-form-box">
          <p className="contact-subtitle">Get In Touch</p>

          <h1>
            Contact <span>Us</span>
          </h1>

          <form onSubmit={handleSubmit}>

            <div className="form-group">
              <label htmlFor="username">Name</label>
              <input
                type="text"
                id="username"
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="Enter your name"
                autoComplete="off"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="off"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write your message..."
                rows={5}
                required
              />
            </div>

            <button type="submit" className="contact-btn">
              Send Message
            </button>

          </form>
        </div>

      </section>
      <section>
      <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d112333.62510316257!2d79.33953794311743!3d28.376205066146987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39a007334d02998d%3A0x5b9d44cf31ee87f!2sBareilly%2C%20Uttar%20Pradesh!5e0!3m2!1sen!2sin!4v1786457844398!5m2!1sen!2sin" width="100%" height="450"  allowFullScreen="" loading="lazy" referrerPolicy="strict-origin-when-cross-origin"></iframe>
      </section>
    </main>
  );
}

  export default contact;