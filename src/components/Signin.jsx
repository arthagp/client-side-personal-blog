"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { userLogin } from "@/app/api/fetch";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const Signin = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault(); 

    try {
      const response = await userLogin(username, password);

      if (response) {
        Cookies.set("username", response.data.username);
        Cookies.set("token", response.data.token);
        Cookies.set("id", response.data.id);

        toast.success("Login success", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });

        router.push("/dashboard");
      } else {
        toast.error("Your username or password is wrong", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }

      setUsername("");
      setPassword("");
    } catch (error) {
      toast.error(`${error.message}`, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div>
      <div className="w-3/5 mx-auto m-16 flex justify-center items-center bg-slate-800 text-white rounded-xl p-8">
        <div className="w-7/12  rounded-xl p-8">
          <Image
            src="/login.png"
            width={300}
            height={100}
            alt="Login Logo"
            className="mx-auto"
          />
        </div>
        <div className="w-5/12 flex flex-col items-center justify-center p-8">
          <h2 className="text-2xl font-semibold mb-2">THE BLOG</h2>
          <p className="mb-4">Login Into Your Account</p>
          <form onSubmit={handleLogin}>
            <label htmlFor="username" className="mb-1 font-thin mr-[200px]">
              Username:
            </label>
            <input
              value={username}
              type="text"
              id="username"
              onChange={handleUsername}
              className="w-full rounded border-gray-300 px-3 py-1 mb-3 focus:ring text-black focus:ring-blue-200"
            />
            <label htmlFor="password" className="mb-1 font-thin mr-[200px] ">
              Password:
            </label>
            <input
              value={password}
              type="password"
              id="password"
              onChange={handlePassword}
              className="w-full rounded border-gray-300 px-3 py-1 mb-3 focus:ring focus:ring-blue-200 text-black"
            />
            <button
              type="submit"
              className="white_btn w-full my-4 font-semibold bg-blue-400"
            >
              Login
            </button>
          </form>
          <span>--------- Or --------</span>
          <Link href="/signup" className="w-full">
            <button className="white_btn w-full my-4 font-semibold bg-green-300">
              Regsiter
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signin;
