"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from next/router
import { findBlogById } from "@/app/api/fetch";
import DetailBlogId from "@/components/Blog/DetailBlogId";
import DummyContent from "@/components/DummyContent";

const DetailBlog = ({ params }) => {
  const [blog, setBlog] = useState(null);
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await findBlogById(params.slug);
        setBlog(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  if (!blog) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <div>
        <button
          onClick={() => router.push("/dashboard")}
          className="ml-[95px] px-3 mt-10 py-1 border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none"
        >
          Back to Dashboard
        </button>
        <div className="flex justify-center mt-5">
          <div className="flex flex-col">
            <h1 className="mt-5 ml-[95px] font-semibold text-lg">
              Recent Blog Post
            </h1>
            <DummyContent />
            <DummyContent />
            <DummyContent />

            {/* Add a back navigation */}
          </div>
          <div className="w-[850px] mr-24 mx-auto">
            <DetailBlogId
              initDate={blog.data.createdAt}
              initUser={blog.data.username}
              initDesc={blog.data.description}
              initTitle={blog.data.title}
              initTags={blog.data.Tags.map((tag) => tag.name)}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailBlog;
