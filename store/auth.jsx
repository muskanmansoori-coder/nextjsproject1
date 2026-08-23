"use client"
import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext =createContext();

export const AuthProvider= ({children}) => {
 
const[user, setUser]=useState(null)
const[token, setToken]=useState("")
const[servpage,setServpage]=useState([])
const[isLoading,setIsLoading]=useState(true)

// serviceData
const  serviceData =async() => {
 

    const response=await fetch("http://localhost:3000/api/servicedata",{
        method:"GET"
    })
    const serv_data=await response.json();
    console.log("serv_data", serv_data);
    
   if(response.ok){
   console.log("data is find successfully");
   setServpage(serv_data.data);

   }  else{
    console.log("data is not found ");
   }
}  


    //store token in localstorage
    const  storeTokenInLS = (tokens) => {
localStorage.setItem("tokenNextjs", tokens)
setToken(tokens);

    }
    //ens ls
    // userAuthenticatio
    const  userAuthentication = async() => {
        try{
            const response = await fetch('http://localhost:3000/api/auth/user',{
                method:"GET",
                headers:{
                    Authorization:`Bearer ${token}`,
                }
            })
            const data = await response.json();
            console.log("authdata", data);
            
            if(response.ok){
                console.log("authenticated user");
                
                setUser(data)
                setIsLoading(false)
            }else{
                console.log('unauthenticated user');
                setIsLoading(false)
            }
        }catch (error) {
    console.log(error);
    setUser(null);

  } finally {
    setIsLoading(false);
  }

    }
    //useeffect
    useEffect(() => {
        if (token) {
          userAuthentication();
        }
      }, [token]);
    //logout
    useEffect(()=>{
  
        const getTokenLS=localStorage.getItem("tokenNextjs");
        if(getTokenLS){
            setToken(getTokenLS)
        }else {
            setIsLoading(false);
          }
        serviceData()
    },[])
    const  Logout = () => {
        setToken("");
        localStorage.removeItem("tokenNextjs")
    }
     //logout end
     //show logout button in na
     const isLogin=!!token
    return(
        <AuthContext.Provider value={{storeTokenInLS,Logout,isLogin, user,servpage, token, isLoading}}>
{children}
        </AuthContext.Provider>
    )
}


export const useAuth = () => {
    const contextValue=useContext(AuthContext);

    if(!contextValue){
        throw new Error("useAuth is used outside of the provide")
    }
    return contextValue;
}