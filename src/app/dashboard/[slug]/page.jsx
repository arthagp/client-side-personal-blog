"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { findBlogById } from "@/app/api/fetch";
import DetailBlogId from "@/components/Blog/DetailBlogId";
import DummyContent from "@/components/DummyContent";
import Cookies from "js-cookie";

const DetailBlog = ({ params }) => {
  const [blog, setBlog] = useState();
  const router = useRouter();
  const [authorId, setAuthorId] = useState();

  const fetchData = async () => {
    try {
      const response = await findBlogById(params.slug);
      setAuthorId(response.data.user_id);
      setBlog(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const currUser = Cookies.get('username')

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
          </div>
          <div className="w-[850px] mr-24 mx-auto">
            <DetailBlogId
              key={blog.id}
              initDate={blog.createdAt}
              initUser={blog.username}
              initDesc={blog.description}
              initTitle={blog.title}
              initTags={blog.Tags.map((tag) => tag.name)}
              comments={blog.Comments}
              blogId={params.slug}
              authorId={blog.user_id}
              isEdit={blog.user_id}
              currentUsername={currUser}
              initUserComment={blog.User.username}
              initLink={`/dashboard/${params.slug}/edit-blog`}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DetailBlog;
