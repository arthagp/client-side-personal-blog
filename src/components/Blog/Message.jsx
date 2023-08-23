'use client'
import React, {useState, useEffect} from "react";
import Image from "next/image";
import { RiDeleteBin6Line } from "react-icons/ri";
import {deleteComment} from '@/app/api/fetch'
import Cookies from "js-cookie";
import { findBlogById } from "@/app/api/fetch";


const Message = ({ comment, initDate, initUserComment, author, commentId, currentUsername}) => {
  const [isDeleted, setIsDeleted] = useState(false);


  const handleDeleteComment = async () => {
    try {
      await deleteComment(commentId);
      setIsDeleted(true);
    } catch (error) {
      console.log("Error deleting comment:", error);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      day: "numeric",
      month: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    const date = new Date(dateString);
    return date.toLocaleDateString("id-ID", options);
  };

  if (isDeleted) {
    return null; // Hide the comment if it's deleted
  }

  
  return (
    <div className="flex items-center justify-between space-x-2 p-2 border rounded-md shadow-md mt-4">
      <div className="flex items-center space-x-2">
        <div className="w-8 h-8">
          <Image src="/user.png" width={35} height={35} alt="user_comment" />
        </div>
        <div>
          <div className="flex">
            <p className="text-slate-600 text-sm">{initUserComment}</p>
            <p className=" text-sm text-blue-300 ml-2">{author}</p>
          </div>
          <p className="text-gray-400 text-sm">{formatDate(initDate)}</p>
          <p className="text-sm">{comment}</p>
        </div>
      </div>
      {currentUsername === initUserComment && (
        <button className="mt-2 flex items-center text-red-600" onClick={handleDeleteComment}>
          <RiDeleteBin6Line className="mr-1" />
          Delete
        </button>
      )}
    
    </div>
  );
};

export default Message;
