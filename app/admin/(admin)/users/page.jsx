"use client"
import { useAuth } from "@/store/auth";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const users= () => {
    const[users,setUsers]=useState([])
  const {token}=  useAuth();
    const getUsers = async() => {
const response = await fetch("http://localhost:3000/api/admin/users",{
method:"GET",
headers:{
    Authorization:`Bearer ${token}`,
}
})
const users_data=await response.json();
console.log("users_data",users_data);

if(response.ok){
    console.log("data is found ");
    setUsers(users_data.data)
    }else{
        console.log("data is not found ");
    }
    }
    useEffect(() => {
        if (token) {
          getUsers();
        }
      }, [token]);
      //delete
      const deleteUser =async(id) => {
console.log("deleteid", id);
try {
   const response = await fetch(`http://localhost:3000/api/admin/users/delete/${id}`,{
    method:"DELETE",
    headers:{
        Authorization:`Bearer ${token}`,
    }
  
   })
   const delete_user=await response.json();
   console.log("delete_user", delete_user);
   
   if(response.ok){
    toast.success("delete user successfully",{classNames:{
        toast:"bg-green-500! text-white! border-black!",
        title:"text-white!"
    }}) 
      getUsers() 
     
   }else{
    toast.error("user is not deleted",{classNames:{
        toast:"bg-red-500! text-white! border-black!",
        title:"text-white!"
    }})  
   }
} catch (error) {
    console.log(error);
    
}
      }
    return(
        <>
  <div className="p-6">
    <h1 className="text-2xl font-bold mb-6">Users Data</h1>

    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-left">
        <thead className="bg-[#b3ebc3]">
          <tr>
            <th className="px-5 py-3 font-semibold">Username</th>
            <th className="px-5 py-3 font-semibold">Email</th>
            <th className="px-5 py-3 font-semibold">Phone</th>
            <th className="px-5 py-3 font-semibold">Update</th>
            <th className="px-5 py-3 font-semibold">Delete</th>
          </tr>
        </thead>

        <tbody>
          {users.map((curusers) => {
            return (
              <tr
                key={curusers._id}
                className="border-t border-gray-200 hover:bg-[#b3ebc3]/30"
              >
                <td className="px-5 py-4">{curusers.username}</td>
                <td className="px-5 py-4">{curusers.email}</td>
                <td className="px-5 py-4">{curusers.phone}</td>

                <td>
               <button className="btn1 update"><Link href={`/admin/users/edit/${curusers._id}`}>Update</Link></button>
                </td>

                <td >
                  <button className="btn1 dlt" onClick={()=>deleteUser(curusers._id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  </div>
</>
      
    )
}
export default users;
