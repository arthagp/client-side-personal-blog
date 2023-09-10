"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { findUserAndId } from "@/app/api/fetch";


const Navbar = () => {
  const routerName = usePathname(); //hooks dari nextjs untuk melihat currentUrl 
  const [username, setUsername] = useState([]);

  const isPage = routerName === "/login" || routerName === "/signup";
  const getUsername = Cookies.get("username");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await findUserAndId();
        const usernames = userData.data.map((user) => user.username);
        setUsername(usernames);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const loggedInUsername = getUsername || 1234; //1234 di buat untuk perbandingan, karena ini di butuhkan untuk perbandingan menggunakan method includes nantinya untuk kondisional rendering includes(), jadi jika ini null/undefined maka method includes tidak berfungsi sehingga menyebabkan error.

  const handleLog = () => {
    if (loggedInUsername) {
      const attribute = ["id", "token", "username"];
      attribute.forEach((attr) => Cookies.remove(attr));
    } else {
      setUsername(null);
    }
  };

  return (
    <nav>
      <div
        className={`flex justify-between items-center pt-4 px-[90px] ${
          isPage ? `border-b-[1px] pb-4 border-black` : null
        }`}
      >
        {/* mengecek apakah array pada username includes/termasuk apa yang ada di dalam argumen includes tersebut yang mana argumen berisi username yang sedang login, di peroleh dari cookies*/}
        {username.includes(loggedInUsername) ? ( 
          <h1 className="text-xl font-semibold">Welcome {loggedInUsername}</h1>
        ) : (
          <Link href="/dashboard">
            <h1 className="text-xl font-semibold">THE BLOG.</h1>
          </Link>
        )}
        <div className="flex justify-center items-center">
          <ul className="flex space-x-4">
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            {username.includes(loggedInUsername) && (
              <li>
                <Link href="/new-blog">New Blog</Link>
              </li>
            )}
            <li>
              <Link href="/profile">Profile</Link>
            </li>
            <li>
              <Link href="/dashboard/my-blog">My Blog</Link>
            </li>
          </ul>
          <div>
            <Link href="/login">
              <button
                onClick={handleLog}
                className="bg-black text-white hover:text-black hover:bg-white hover:border-slate-600 border font-semibold py-2 px-4 ml-8 rounded-full"
              >
                {username.includes(loggedInUsername) ? "Log Out" : "Sign In"}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;