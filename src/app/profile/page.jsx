

"use client";

import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function ProfilePage() {
  const router = useRouter();

  // Better Auth Session
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/login");
    }
  }, [session, isPending, router]);

  // Loading State
  if (isPending) {
    return (
      <div className="h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  // User না থাকলে কিছু দেখাবে না
  if (!session) {
    return null;
  }

  const user = session.user;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8">
        
        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <Image
            src={user.image || "https://i.ibb.co/4pDNDk1/avatar.png"}
            alt="Profile"
            width={120}
            height={120}
            className="rounded-full border-4 border-blue-500"
          />

          <h1 className="text-2xl font-bold mt-4">
            {user.name}
          </h1>

          <p className="text-gray-500">
            {user.email}
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-8">
          <button
            onClick={() => authClient.signOut()}
            className="w-full bg-red-500 hover:bg-red-600 text-white py-3 rounded-lg"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}