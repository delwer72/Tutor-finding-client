

"use client";

import { useState } from "react";
import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import {
  usePathname,
  useRouter,
} from "next/navigation";

import { Button } from "@heroui/react";

// new add
import { useTheme } from "next-themes";
import { useEffect } from "react";

const Navbar = () => {

  // new add

  const { theme, setTheme } = useTheme();

const [mounted, setMounted] =
  useState(false);

useEffect(() => {
  setMounted(true);
}, []);

  const { data: session, isPending } =
    authClient.useSession();

  const user = session?.user;

  const pathname = usePathname();

  const router = useRouter();

  const [open, setOpen] = useState(false);

  // ====================================
  // LOGOUT
  // ====================================

  const handleSignOut = async () => {

    await authClient.signOut();

    router.push("/login");
  };

  // ====================================
  // ACTIVE NAV LINK
  // ====================================

  const navLink = (path) =>

    pathname === path

        ? "text-cyan-600 font-bold border-b-2 border-cyan-600 pb-1 transition-all duration-200"
    : "text-gray-700 dark:text-gray-300 hover:text-cyan-600 transition-all duration-200";

  return (

    <nav className="sticky top-0 z-50 bg-white dark:bg-gray-900 border-b dark:border-gray-700 shadow-sm">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* ============================= */}
        {/* LOGO */}
        {/* ============================= */}

        <Link href="/">

          <Image
            src="/assets/tutor-finder.png"
            width={150}
            height={60}
            alt="Tutor Finder"
            priority
          />

        </Link>

        {/* ============================= */}
        {/* NAV LINKS */}
        {/* ============================= */}

        <ul className="flex items-center gap-7 text-[17px] font-medium">

          <li>

            <Link
              href="/"
              className={navLink("/")}
            >
              Home
            </Link>

          </li>

          <li>

            <Link
              href="/all-tutors"
              className={navLink(
                "/all-tutors"
              )}
            >
              All Tutors
            </Link>

          </li>

          <li>

            <Link
              href="/add-tutor"
              className={navLink(
                "/add-tutor"
              )}
            >
              Add Tutor
            </Link>

          </li>

          <li>

            <Link
              href="/my-tutors"
              className={navLink(
                "/my-tutors"
              )}
            >
              My Tutors
            </Link>

          </li>

          <li>

            <Link
              href="/booked-session"
              className={navLink(
                "/booked-session"
              )}
            >
              Booked Sessions
            </Link>

          </li>

        </ul>

        {/* ============================= */}
        {/* RIGHT SIDE */}
        {/* ============================= */}

        <div className="flex items-center gap-4">

  {mounted && (
    <button
      onClick={() =>
        setTheme(theme === "dark" ? "light" : "dark")
      }
      className="px-3 py-2 rounded-lg border dark:border-gray-600"
    >
      {theme === "dark" ? "☀️" : "🌙"}
    </button>
  )}

  {/* <div className="relative">
    ...
  </div> */}

</div>
     

        <div className="relative">

          {/* LOADING */}

          {isPending ? (

            <div className="text-gray-500">
              Loading...
            </div>

          ) : user ? (

            <>
              {/* ============================= */}
              {/* AVATAR BUTTON */}
              {/* ============================= */}

              <button
                onClick={() =>
                  setOpen(!open)
                }
                className="focus:outline-none"
              >

                {user?.image ? (

                  <img
                    src={user.image}
                    alt="user"
                    className="w-12 h-12 rounded-full border-2 border-cyan-500 object-cover"
                  />

                ) : (

                  <div className="w-12 h-12 rounded-full bg-cyan-500 text-white flex items-center justify-center text-lg font-bold border-2 border-cyan-500">

                    {user?.name
                      ?.charAt(0)
                      .toUpperCase()}

                  </div>

                )}

              </button>

              {/* ============================= */}
              {/* DROPDOWN */}
              {/* ============================= */}

              {open && (

                <div className="absolute right-0 mt-3 w-48 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-xl overflow-hidden">

                  {/* USER INFO */}

                  <div className="px-4 py-3 border-b">

                    <h3 className="font-semibold text-gray-800">
                      {user?.name}
                    </h3>

                    <p className="text-sm text-gray-500 truncate">
                      {user?.email}
                    </p>

                  </div>

                  {/* PROFILE */}

                  <button
                    onClick={() => {

                      router.push(
                        "/profile"
                      );

                      setOpen(false);
                    }}
                    className="w-full text-left px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 dark:text-white transition"
                  >
                    Profile
                  </button>

                  {/* LOGOUT */}

                  <button
                    onClick={() => {

                      handleSignOut();

                      setOpen(false);
                    }}
                      className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-50 dark:hover:bg-gray-700 transition"
                  >
                    Logout
                  </button>

                </div>

              )}

            </>

          ) : (

            <div className="flex items-center gap-3">

              {/* LOGIN */}

              <Link href="/login">

                <Button variant="light">
                  Login
                </Button>

              </Link>

              {/* REGISTER */}

              <Link href="/signup">

                <Button className="bg-cyan-500 hover:bg-cyan-600 text-white">
                  Register
                </Button>

              </Link>

            </div>

          )}


        </div>

      </div>

    </nav>
  );
};

export default Navbar;