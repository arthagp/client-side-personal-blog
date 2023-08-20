"use client";

import React, { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import Cookies from "js-cookie";

const Navbar = () => {
  const routerName = usePathname();
  const router = useRouter();

  const isPage = routerName === "/login" || routerName === "/signup";
  const username = Cookies.get("username");

  const handleLog = () => {
    if (username !== undefined) {
      const cookieNames = ["username", "id", "token"];
      cookieNames.forEach((cookieName) => {
        return Cookies.remove(cookieName);
      });
    } else {
      return router.push("/login");
    }
  };

  return (
    <nav>
      <div
        className={`flex justify-between items-center pt-4 px-[90px] ${
          isPage ? `border-b-[1px] pb-4 border-black` : null
        }`}
      >
        <h1 className="text-xl font-semibold">
          {username !== undefined ? `Welcome ${username}` : `THE BLOG.`}
        </h1>
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
                {username !== undefined ? `Log Out` : `Sign In`}
              </button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
