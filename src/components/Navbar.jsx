"use client";

import React, { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";
import { findUserAndId } from "@/app/api/fetch";

const Navbar = () => {
  const routerName = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState([]); // State untuk menyimpan username

  const isPage = routerName === "/login" || routerName === "/signup";
  const getUsername = Cookies.get("username");

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await findUserAndId(); // Ganti dengan fungsi/API yang sesuai
        const usernames = userData.data.map((user) => user.username);
        setUsername(usernames);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const loggedInUsername = getUsername;

  const handleLog = () => {
    if (loggedInUsername) {
      const attribute = ["id", "token", "username"];
      attribute.forEach((attr) => Cookies.remove(attr));
      router.push("/login");
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
        {username.includes(loggedInUsername) ? (
          <h1 className="text-xl font-semibold">Welcome {loggedInUsername}</h1>
        ) : (
          <h1 className="text-xl font-semibold">THE BLOG.</h1>
        )}
        <div className="flex justify-center items-center">
          <ul className="flex space-x-4">
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link href="/new-blog">New Blog</Link>
            </li>
            <li>
              <Link href="/profile">Profile</Link>
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
