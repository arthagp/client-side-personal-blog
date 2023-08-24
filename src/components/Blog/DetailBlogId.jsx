"use client";
import React, { useState } from "react";
import Comments from "./Comments";
import Link from "next/link";

const DetailBlogId = ({
  initDate,
  initTitle,
  initDesc,
  initTags,
  comments,
  blogId,
  authorId,
  currentUsername,
  initUserComment,
  initLink
}) => {
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

  const [commentsState, setCommentsState] = useState(comments);
  // console.log('Common state: ',commentsState)

  const handleAddComment = (newComment) => {
    setCommentsState((prevComments) => [newComment, ...prevComments]);
  };

  return (
    <div className="text-black p-5 rounded-lg shadow-lg">
      <p className="text-sm text-[#6941C6]">{formatDate(initDate)}</p>
      <h2 className="text-xl font-semibold mt-2">{initTitle}</h2>
      <img
        src="https://fakeimg.pl/850x350/"
        alt="fakeimage"
        className="w-full h-[350px] object-cover mt-4 rounded-md"
      />
      <div className="mt-4" dangerouslySetInnerHTML={{ __html: initDesc }} />
      <div className="mt-4 flex flex-wrap gap-2">
        {initTags.map((tag, index) => (
          <div
            key={index}
            className={`rounded-lg ${
              colorRandom[index % colorRandom.length]
            } py-1 px-2 text-xs font-semibold whitespace-nowrap`}
          >
            {tag}
          </div>
        ))}
      </div>
      {currentUsername === initUserComment && (
        <div className="flex justify-end">
          <Link href={initLink}>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded">
              Edit Blog
            </button>
          </Link>
        </div>
      )}

      <div className="my-6">
        <Comments
          key={commentsState.id}
          authorId={authorId}
          comments={commentsState}
          postId={blogId}
          onCommentAdded={handleAddComment}
        />
      </div>
    </div>
  );
};

export default DetailBlogId;
