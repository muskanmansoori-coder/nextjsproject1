'use client'

import { useAuth } from "@/store/auth"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { toast } from "sonner";
const editPage = () => {
    const[singleUser, setSingleUser]=useState({
        username:"",
        email:"",
        phone:"",

    })
    const {token}=useAuth();
    const params= useParams();
    const id= params.id;
    console.log("params", params);
    
    const   getsingleUser = async(id) => {
const response=await fetch(`http://localhost:3000/api/admin/users/edit/${id}`,{
    method:"GET",

    headers:{
        Authorization:`Bearer ${token}`,
    }
 
})
const data=await response.json();
console.log("singleuserdata",data);
if(response.ok){
console.log("single user data get successfully");
setSingleUser(data.data)
}else{
console.log("singleuser data is not find ");

}

    }
    //useeffect
    useEffect(() => {
      if (id && token) {
        getsingleUser(id);
      }
    }, [id, token]);
    //handleChange
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setSingleUser({
          ...singleUser,
          [name]: value,
        });
      };
      //hadnleSubmit
      const hadnleSubmit = async(e) =>{
e.preventDefault();
try {
  const response=await fetch(`http://localhost:3000/api/admin/users/edit/${id}`,{
    method:"PATCH",
    headers:{
      Authorization:`Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body:JSON.stringify(singleUser),
  });

  const up_data=await response.json();
  console.log("up_data",up_data);
  
  if(response.ok){

toast.success("user updated successfully",{classNames:{
  toast:"bg-green-500! text-white! border-black!",
  title:"text-white!"
}})

setSingleUser({
  username:"",
  email:"",
  phone:"",
})
  }else{
    toast.error(up_data.error || up_data.message,{classNames:{
      toast:"bg-red-500! text-white! border-black!",
      title:"text-white!"
  }})

  }
} catch (error) {
  console.log(error)
}
      }
    return(
        <main>
      <section className="contact-page container">


        {/* RIGHT FORM */}
        <div className="contact-form-box">
      

          <h1>
            Update <span>user</span>
          </h1>

          <form onSubmit={hadnleSubmit}>

            <div className="form-group">
              <label htmlFor="username">Name</label>
              <input
                type="text"
                id="username"
                value={singleUser.username}
                onChange={handleChange}
                name="username"
              
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
                value={singleUser.email}
                onChange={handleChange}
                placeholder="Enter your email"
                autoComplete="off"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone">Phone</label>
              <input
                type="phone"
                id="phone"
                name="phone"
                value={singleUser.phone}
                onChange={handleChange}
                placeholder="Enter your phone"
                autoComplete="off"
                required
              />
            </div>

         

            <button type="submit" className="contact-btn">
            Update
            </button>

          </form>
        </div>

      </section>
     
    </main>
    )
}
export default editPage;