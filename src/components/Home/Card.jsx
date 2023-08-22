"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

const Card = ({ blog, initUser, initDate, initTitle, initDesc, initTags }) => {
  const formatDate = (dateString) => {
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
  };

  const colorRandom = [
    "bg-red-200",
    "bg-green-200",
    "bg-blue-200",
    "bg-yellow-200",
    "bg-purple-200",
    "bg-pink-200",
    "bg-indigo-200",
    "bg-teal-200",
    "bg-orange-200",
    "bg-cyan-200",
    "bg-gray-200",
    "bg-lime-200",
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <img
        src="https://fakeimg.pl/350x200/"
        alt="fakeimage"
        className="w-full h-48 object-cover rounded-md"
      />
      <p className="mt-2 text-[#6941C6]">
        {initUser} - {formatDate(initDate)}
      </p>
      <h2 className="mt-2 font-bold text-xl line-clamp-2">
        <Link href={`/dashboard/${blog}`}>
          {console.log(blog)}
          {initTitle}
        </Link>
      </h2>
      <p className="mt-2 font-light line-clamp-3">{initDesc}</p>
      <div className="mt-2 flex flex-wrap gap-3">
        {initTags.map((tag, index) => (
          <div
            key={index}
            className={`rounded-xl ${
              colorRandom[index % colorRandom.length]
            } h-6 flex justify-center text-center items-center text-slate-600 text-sm font-semibold whitespace-nowrap px-2`}
            style={{ minWidth: `${tag.length * 10}px` }}
          >
            {tag}
            {/* {console.log(tag.id)} */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
