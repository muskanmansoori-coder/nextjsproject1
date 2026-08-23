"use client"
import { useAuth } from "@/store/auth";
import { useEffect, useState } from "react";
import { toast } from "sonner";


const contacts= () => {
    const[contacts,setContacts]=useState([])
  const {token}=  useAuth();
    const getContacts = async() => {
const response = await fetch("/api/admin/contacts",{
method:"GET",
headers:{
    Authorization:`Bearer ${token}`,
}
})
const contacts_data=await response.json();
console.log("contacts_data",contacts_data);

if(response.ok){
    console.log("data is found ");
    setContacts(contacts_data.data)
    }else{
        console.log("contact data is not found ");
    }
    }
    useEffect(() => {
        if (token) {
          getContacts();
        }
      }, [token]);
      //deleteContact
      const deleteContact =async(id)=>{
        try {
            const response = await fetch(`/api/admin/contacts/delete/${id}`,{
             method:"DELETE",
             headers:{
                 Authorization:`Bearer ${token}`,
             }
           
            })
            const delete_cont=await response.json();
            console.log("delete_cont", delete_cont);
            
            if(response.ok){
            toast.success("delete contact successfully",{classNames:{
                toast:"bg-green-500! text-white! border-black!",
                title:"text-white!"
            }}) 
               getContacts() 
              
            }else{
             toast.error("contact is not deleted",{classNames:{
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
    <h1 className="text-2xl font-bold mb-6">Contacts Data</h1>

    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="w-full text-left">
        <thead className="bg-[#b3ebc3]">
          <tr>
            <th className="px-5 py-3 font-semibold">Username</th>
            <th className="px-5 py-3 font-semibold">Email</th>
            <th className="px-5 py-3 font-semibold">Message</th>
            <th className="px-5 py-3 font-semibold">Delete</th>
          </tr>
        </thead>

        <tbody>
          {contacts.map((curconts) => {
            return (
              <tr
                key={curconts._id}
                className="border-t border-gray-200 hover:bg-[#b3ebc3]/30"
              >
                <td className="px-5 py-4">{curconts.username}</td>
                <td className="px-5 py-4">{curconts.email}</td>
                <td className="px-5 py-4">{curconts.message}</td>


                <td >
                  <button className="btn1 dlt" onClick={()=>deleteContact(curconts._id)}>
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
export default contacts;
