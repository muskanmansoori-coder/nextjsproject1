"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const  NotFound = ()=> {
  const router = useRouter();

  return (
    <main className="not-found-page">
      <div className="not-found-container container">

        <div className="not-found-image">
          <Image
            src="/images/next404.png"
            alt="Page not found"
            width={500}
            height={400}
          />
        </div>

        <div className="not-found-content">
          <h1>404</h1>

          <h2>Page Not Found</h2>

          <p>
            Oops! The page you are looking for doesn't exist or may
            have been moved.
          </p>

          <div className="not-found-buttons">
            <button onClick={() => router.back()}>
              ← Go Back
            </button>

            <Link href="/">
              Home
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
export default NotFound;