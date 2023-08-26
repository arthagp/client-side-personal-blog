"use client";
import React from "react";
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
        src="https://fakeimg.pl/350x200/" //sementara menggunakan fakeimg
        alt="fakeimage"
        className="w-full h-48 object-cover rounded-md"
      />
      <p className="mt-2 text-[#6941C6]">
        {initUser} - {formatDate(initDate)}
      </p>
      <h2 className="mt-2 font-bold text-xl line-clamp-2">
        <Link href={`/dashboard/${blog}`}>
          {initTitle}
        </Link>
      </h2>
      {/* menggunakan properti dari react untuk mengabaikan desc yang memiliki tag html, yang akan di tampilkan << innerHtml */}
      <div className="mt-2 font-light line-clamp-3" dangerouslySetInnerHTML={{ __html: initDesc }} /> 
      <div className="mt-2 flex flex-wrap gap-3">
        {/* membuat sebuag tag elemen dengan map, yang mana ini berfungsi untuk menampilkan elemen yang berisi tag dengan bisa lebih dari satu elemen tag yang di tampilkan */}
        {initTags.map((tag, index) => (
          <div
            key={index}
            className={`rounded-xl ${
              colorRandom[index % colorRandom.length] //untuk merandom color
            } h-6 flex justify-center text-center items-center text-slate-600 text-sm font-semibold whitespace-nowrap px-2`}
            style={{ minWidth: `${tag.length * 10}px` }} //untuk menyesuaikan ukuran elemen setiap tag yang dibuat dengan panjang dari tag di kalikan 10 pixel, agar lebih dinamis
          >
            {tag}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Card;
