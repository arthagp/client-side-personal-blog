'use client'
import React from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { userRegister } from "@/app/api/fetch";
import Image from "next/image";

const Signup = () => {
  const router = useRouter();
  
  const isSuccess = async (values) => {
    try {
      const response = await userRegister(values.username, values.password); // mengambil values dari formik sehingga harus menggunakan values.username
      console.log(response.data);
      toast.success("Registration successful", {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      window.location.reload();
    } catch (error) {
      toast.error(`${error.message}`, {
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
  };

  const formik = useFormik({
    // value.(properti)
    initialValues: {
      username: "",
      password: "",
      rePassword: "",
    },
    onSubmit: (values) => {
      isSuccess(values);
    },
    validationSchema: yup.object().shape({
      username: yup.string().required("Username is required").min(3).max(10),
      password: yup
        .string()
        .required("Password is required")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Password must have at least one uppercase, one lowercase, one number, and one special character"
        ),
      rePassword: yup
        .string()
        .required("Re-enter password is required")
        .oneOf([yup.ref("password"), null], "Passwords must match"),
    }),
  });

  return (
    <div>
      <div className="w-3/5 mx-auto m-16 flex justify-center items-center bg-slate-800 text-white rounded-xl p-8">
        <div className="w-7/12 rounded-xl p-8">
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
          <p className="mb-4">Register Account</p>
          <form onSubmit={formik.handleSubmit}>
            <div className="mb-4">
              <label htmlFor="username" className="mb-1 font-thin">
                Username:
              </label>
              <input
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="text"
                id="username"
                className="w-full rounded border-gray-300 px-3 py-1 focus:ring text-black focus:ring-blue-200"
              />
              {formik.touched.username && formik.errors.username && (
                <div className="text-red-500">{formik.errors.username}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="mb-1 font-thin">
                Password:
              </label>
              <input
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                id="password"
                className="w-full rounded border-gray-300 px-3 py-1 text-black focus:ring focus:ring-blue-200"
              />
              {formik.touched.password && formik.errors.password && (
                <div className="text-red-500 text-sm">{formik.errors.password}</div>
              )}
            </div>
            <div className="mb-4">
              <label htmlFor="rePassword" className="mb-1 font-thin">
                Re-Password:
              </label>
              <input
                name="rePassword"
                value={formik.values.rePassword}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="password"
                id="rePassword"
                className="w-full rounded border-gray-300 text-black px-3 py-1 focus:ring focus:ring-blue-200"
              />
              {formik.touched.rePassword && formik.errors.rePassword && (
                <div className="text-red-500 text-sm">{formik.errors.rePassword}</div>
              )}
            </div>
            <button
              type="submit"
              className="white_btn w-full my-4 font-semibold bg-green-300"
            >
              Register
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
