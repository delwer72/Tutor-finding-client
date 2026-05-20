
// "use client";

// import { authClient } from "@/lib/auth-client";
// import { Avatar, Button } from "@heroui/react";
// import Image from "next/image";
// import Link from "next/link";
// import { usePathname } from "next/navigation";
// import React from "react";

// const Navbar = () => {
//   const { data: session } = authClient.useSession();
//   const user = session?.user;

//   // current route
//   const pathname = usePathname();

//   const handleSignOut = async () => {
//     await authClient.signOut();
//   };

//   // active link style function
//   const navLink = (path) =>
//     pathname === path
//       ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-1"
//       : "text-black";

//   return (
//     <nav className="flex items-center justify-between bg-white p-5 border-b">

//       {/* Logo */}
//       <div>
//         <Image
//           src={"/assets/tutor-finder.png"}
//           height={150}
//           width={150}
//           alt="logo"
//         />
//       </div>

//       {/* Middle Nav */}
//       <ul className="flex gap-5 items-center">

//         <li>
//           <Link className={navLink("/")} href={"/"}>
//             Home
//           </Link>
//         </li>

//         <li>
//           <Link className={navLink("/tutors")} href={"/tutors"}>
//             Tutors
//           </Link>
//         </li>

//         <li>
//           <Link className={navLink("/add-tutor")} href={"/add-tutor"}>
//             Add Tutors
//           </Link>
//         </li>

//         <li>
//           <Link className={navLink("/my-tutors")} href={"/my-tutors"}>
//             My Tutors
//           </Link>
//         </li>

//         <li>
//           <Link
//             className={navLink("/my-bookings")}
//             href={"/my-bookings"}
//           >
//             My Booked Session
//           </Link>
//         </li>
//       </ul>

//       {/* Right Side */}
//       <ul className="flex items-center gap-4">
      
//       {user ? (
//           <>

//         <li>
//           <Link className={navLink("/profile")} href={"/profile"}>
//             Profile
//           </Link>
//         </li>

//         {/* {user ? (
//           <> */}
//             <li>
//               <Avatar>
//                 <Avatar.Image
//                   referrerPolicy="no-referrer"
//                   alt={user?.name}
//                   src={user?.image}
//                 />
//                 <Avatar.Fallback>
//                   {user?.name?.charAt(0)}
//                 </Avatar.Fallback>
//               </Avatar>
//             </li>

//             <li>
//               <Button
//                 onClick={handleSignOut}
//                 variant="danger"
//                 className="rounded-none"
//               >
//                 Logout
//               </Button>
//             </li>
//           </>
//         ) : (
//           <>
//             <li>
//               <Link className={navLink("/login")} href={"/login"}>
//                 Login
//               </Link>
//             </li>

//             <li>
//               <Link className={navLink("/signup")} href={"/signup"}>
//                 Register 
//               </Link>
//             </li>
//           </>
//         )}
//       </ul>
//     </nav>
//   );
// };

// export default Navbar;
"use client";

import { authClient } from "@/lib/auth-client";

import {
  Avatar,
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@heroui/react";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

const Navbar = () => {
  const { data: session } = authClient.useSession();

  const user = session?.user;

  const pathname = usePathname();

  const router = useRouter();

  // logout
  const handleSignOut = async () => {
    await authClient.signOut();

    router.push("/login");
  };

  // active nav style
  const navLink = (path) =>
    pathname === path
      ? "text-blue-600 font-bold border-b-2 border-blue-600 pb-1"
      : "text-black";

  return (
    <nav className="flex items-center justify-between bg-white p-5 border-b">

      {/* Logo */}
      <div>
        <Image
          src="/assets/tutor-finder.png"
          width={150}
          height={150}
          className="h-auto"
          alt="Tutor Finder"
        />
      </div>

      {/* Nav Links */}
      <ul className="flex gap-5 items-center">

        <li>
          <Link className={navLink("/")} href="/">
            Home
          </Link>
        </li>

        <li>
          <Link className={navLink("/tutors")} href="/tutors">
            All Tutors
          </Link>
        </li>

        <li>
          <Link className={navLink("/add-tutor")} href="/add-tutor">
            Add Tutors
          </Link>
        </li>

        <li>
          <Link className={navLink("/my-tutors")} href="/my-tutors">
            My Tutors
          </Link>
        </li>

        <li>
          <Link
            className={navLink("/my-bookings")}
            href="/my-bookings"
          >
            My Booked Session
          </Link>
        </li>

      </ul>

 {/* Right Side */}
<div className="relative">

  {user ? (

    <details className="dropdown">

      {/* Avatar Button */}
      <summary className="list-none cursor-pointer">

        {user?.image ? (

          <img
            src={user.image}
            alt="user"
            className="w-12 h-12 rounded-full border-2 border-cyan-500 object-cover"
          />

        ) : (

          <div className="w-12 h-12 rounded-full border-2 border-cyan-500 flex items-center justify-center text-lg font-bold bg-cyan-500 text-white">

            {user?.name?.charAt(0).toUpperCase()}

          </div>

        )}

      </summary>

      {/* Dropdown */}
      <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-50">

        <button
          onClick={() => router.push("/profile")}
          className="block w-full text-left px-4 py-2 hover:bg-gray-100"
        >
          Profile
        </button>

        <button
          onClick={handleSignOut}
          className="block w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
        >
          Logout
        </button>

      </div>

    </details>

  ) : (

    <div className="flex items-center gap-4">

      <Link href="/login">
        <Button variant="light">
          Login
        </Button>
      </Link>

      <Link href="/signup">
        <Button className="bg-cyan-500 text-white">
          Register
        </Button>
      </Link>

    </div>

  )}

</div>


    </nav>
  );
};

export default Navbar;