import Image from "next/image";
import Link from "next/link";

const Home = () => {
  return(
        <main className="container">
    {/*part1*/}
     
          <section className="hero">
            <div className="hero-content">
              <p className="hero-subtitle">Welcome to TechFlow</p>
    
              <h1>
                Build Better.
                <br />
                <span>Grow Faster.</span>
              </h1>
    
              <p className="hero-description">
                We create modern, fast and user-friendly digital solutions
                that help businesses grow and succeed online.
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
    
            <div className="hero-image">
              <Image
                src="/images/nexthome1.png"
                alt="Technology illustration"
                width={550}
                height={450}
                priority
              />
            </div>
          </section>
       {/*part2*/}
          <section className="features-strip">
  <div className="container features">
    
    <div className="feature">
      <span>⚡</span>
      <div>
        <h3>Fast Performance</h3>
        <p>Lightning fast experience</p>
      </div>
    </div>

    <div className="feature">
      <span>🔒</span>
      <div>
        <h3>Secure Solutions</h3>
        <p>Your data stays protected</p>
      </div>
    </div>

    <div className="feature">
      <span>💡</span>
      <div>
        <h3>Modern Technology</h3>
        <p>Built with latest technologies</p>
      </div>
    </div>

    <div className="feature">
      <span>📱</span>
      <div>
        <h3>Fully Responsive</h3>
        <p>Works on every device</p>
      </div>
    </div>

  </div>
</section>
{/*part3 */}
<section className="about-home container">
  <div className="about-home-image">
    <Image
      src="/images/nexthome2.png"
      alt="Technology solutions"
      width={550}
      height={450}
    />
  </div>

  <div className="about-home-content">
    <p className="section-subtitle">Who We Are</p>

    <h2>
      We Build Digital
      <span> Experiences</span>
    </h2>

    <p>
      At TechFlow, we create innovative and reliable digital solutions
      that help businesses turn their ideas into reality. Our focus is
      on quality, performance and user experience.
    </p>

    <Link href="/about" className="btn primary-btn">
      Learn More
    </Link>
  </div>
</section>
        </main>
      );
    }

export default Home;