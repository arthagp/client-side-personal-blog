"use client";

import Card from "@/components/Home/Card";
import CardLeft from "@/components/Home/CardLeft";
import CardRight from "@/components/Home/CardRight";
import Hero from "@/components/Home/Hero";
import { useEffect, useState } from "react";
import { findAllBlog } from "@/app/api/fetch";

export default function Home() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findAllBlog();
        setBlogs(response.data);
        // console.log(response.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  // console.log(blogs.map(blog => blog.id))
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
        {!blogs ? (
          <div>Loading...</div>
        ) : (
          blogs.map((blog) => (
            <Card
              key={blog.id}
              blog={blog.id}
              initDate={blog.createdAt}
              initUser={blog.username}
              initDesc={blog.description}
              initTitle={blog.title}
              initTags={blog.Tags.map((tag) => tag.name)}
            />
          ))
        )}
      </div>
    </>
  );
}
