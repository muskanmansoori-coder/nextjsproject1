"use client"
import { useAuth } from "@/store/auth";
import Image from "next/image";
import { useEffect } from "react";

const Home = () => {

  const {servpage}= useAuth()

    return(
      <main className="container">
      <section>
        <div className="grid-four--cols">
          {servpage.map((curSer, index)=>{
            return(
<div className="card-cont card-content card" key={index}>
            <div>
              <Image src="/images/nextservice.png" alt="service image" width={200} height={200}  />
              </div>
            <div>
              <div className="flex justify-between">
                <p>{curSer.service}</p>
                <p>{curSer.price}</p>
              </div>
            <h2>{curSer.role}</h2>
            
            <p>{curSer.description}</p>
            </div>
          </div>
            )
          })}
          
        
         
         
          
        </div>
      </section>
      </main>
    )
  }
  export default Home;