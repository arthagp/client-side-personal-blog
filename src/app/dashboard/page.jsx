"use client";

import Card from "@/components/Home/Card";
import CardLeft from "@/components/Home/CardLeft";
import CardRight from "@/components/Home/CardRight";
import Hero from "@/components/Home/Hero";
import { useEffect, useState } from "react";
import { findAllBlog } from "@/app/api/fetch";

import React from "react";

const HomePage = () => {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [blogsPerPage] = useState(6);

  const fetchData = async () => {
    try {
      const response = await findAllBlog();
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Menghitung indeks blog pada halaman saat ini
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (!blogs) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Hero />
      <h1 className="ml-[105px] my-5 font-bold text-xl">Recent Blog Post</h1>
      <div className="flex justify-between px-[105px]">
        <div>
          <CardLeft />
        </div>
        <div>
          <CardRight />
          <CardRight />
        </div>
      </div>
      <h1 className="ml-[105px] my-5 font-bold text-xl">All Blog Post</h1>
      <div className="grid grid-cols-3 gap-4 px-[105px]">
        {currentBlogs.map((blog) => (
          <Card
            key={blog.id}
            blog={blog.id}
            initDate={blog.createdAt}
            initUser={blog.username}
            initDesc={blog.description}
            initTitle={blog.title}
            initTags={blog.Tags.map((tag) => tag.name)}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-5">
        {Array.from(
          { length: Math.ceil(blogs.length / blogsPerPage) },
          (_, i) => (
            <button
              key={i}
              onClick={() => paginate(i + 1)}
              className={`mx-1 px-3 py-1 rounded-full ${
                currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
              }`}
            >
              {i + 1}
            </button>
          )
        )}
      </div>
    </>
  );
};

export default HomePage;
