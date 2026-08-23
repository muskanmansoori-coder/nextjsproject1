"use client";

import { useAuth } from "@/store/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const Admin = () => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  console.log("ADMIN USER =", user);
  console.log("IS ADMIN =", user?.isAdmin);

  useEffect(() => {
    if (isLoading) return;

    if (!user) {
      router.replace("/");
      return;
    }

    if (user.user.isAdmin !== true) {
      router.replace("/");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!user || user.user.isAdmin !== true) {
    return null;
  }

  return null;
};

export default Admin;