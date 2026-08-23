"use client"
import { useAuth } from "@/store/auth";
import Image from "next/image";
import Link from "next/link";
const About = () => {
  const {user} = useAuth()
    return(
  
    <main>
      <section className="about-page container">

        <div className="about-content">
          <p className="about-subtitle">About Us</p>

          <h1>
            Welcome, {user?`${user.user.username}`:"to our website"}
          </h1>

          <p>
            Welcome to TechFlow! We are a modern technology platform focused
            on creating simple, powerful and user-friendly digital solutions.
          </p>

          <p>
            Our goal is to build reliable digital experiences using modern
            technologies and creative ideas. We focus on quality, performance
            and user satisfaction.
          </p>

          <p>
            We continuously learn, improve and adapt to new technologies to
            deliver solutions that make a real difference.
          </p>
          <div className="hero-buttons">
            
             <button>  <Link href="/service" className="btn primary-btn">
                  Explore Services
                </Link></button>
               
    
                <button>
                <Link href="/contact" className="btn secondary-btn">
                  Contact Us
                </Link>
                </button>
              </div>
        </div>

        <div className="about-image">
          <Image
            src="/images/nextabout.png"
            alt="About TechFlow"
            width={550}
            height={500}
          />
        </div>

      </section>
    </main>
  );

      
    
  }
  export default About;