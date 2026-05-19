"use client";

import { authClient } from "@/lib/auth-client";
import { Avatar, Button } from "@heroui/react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Navbar = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <nav className="flex items-center justify-between bg-white p-5">

      <div>
        <Image
          src={"/assets/tutor-finder.png"}
          height={150}
          width={150}
          alt="logo"
        />
      </div>


      <ul className="flex gap-3">
        <li>
          <Link href={"/"}>Home</Link>
        </li>
        <li>
          <Link href={"/tutors"}>Tutors</Link>
        
        </li>

          <li>
          <Link href={"/add-tutor"}>Add Tutors</Link>
        </li>

          <li>
          <Link href={"/"}>My Tutors</Link>
        </li>
        
        <li>
          <Link href={"/my-bookings"}>My Booked Session</Link>
        </li>

      </ul>

      <ul className="flex items-center gap-3">
        <li>
          <Link href={"/profile"}>Profile</Link>
        </li>

        {user ? (
          <>
            <li>
              <Avatar>
                <Avatar.Image referrerPolicy="no-referrer" alt="John Doe" src={user?.image} />
                <Avatar.Fallback>{user.name.charAt(0)}</Avatar.Fallback>
              </Avatar>
            </li>
            <li>
              <Button onClick={handleSignOut} variant="danger" className={"rounded-none"}>
                Logout
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link href={"/login"}>Login</Link>
            </li>
            <li>
              <Link href={"/signup"}>Sign Up</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
