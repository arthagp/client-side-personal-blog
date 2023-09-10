"use client";
import React, { useState } from "react";
import Comments from "./Comments";
import Link from "next/link";
import Modal from "react-modal";
import { deleteBlogById } from "@/app/api/fetch";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

Modal.setAppElement("body");

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
  initLink,
  postId,
}) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

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

  const handleDeleteBlog = async () => {
    try {
      const response = await deleteBlogById(postId);
      console.log(postId);
      console.log(response);
      if (response) {
        toast.success("delete blog success", {
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
      }
    } catch (error) {
      console.log(error);
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

  const customStyles = {
    overlay: {
      position: "fixed",
      // top: 0,
      // left: 0,
      // right: 0,
      // bottom: 0,
      backgroundColor: "rgba(255, 255, 255, 0.65)",
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const [commentsState, setCommentsState] = useState(comments); //berisi comment
  
  
  const handleAddComment = (newComment) => {
    setCommentsState((prevComments) => [newComment, ...prevComments]); // menambahkan newComment ke dalam array blog.Comments
    console.log(newComment)
  };

  console.log(commentsState, '<<<< comment state')

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
      <hr className="m-5 border-2 " />

      <div className="flex justify-end my-4">
        {currentUsername === initUserComment && (
          <Link href={initLink}>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-1 px-3 rounded m-3">
              Edit Blog
            </button>
          </Link>
        )}
        {currentUsername === initUserComment && (
          <button
            onClick={openModal}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-3 rounded m-3"
          >
            Delete Blog
          </button>
        )}
      </div>
      {/* react-modal */}
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Delete Confirmation"
        style={customStyles}
      >
        <div className="bg-white rounded-lg">
          <h2 className="text-xl font-semibold mb-4">
            Are you sure you want to delete?
          </h2>
          <div className="flex justify-end space-x-2">
            <button
              onClick={handleDeleteBlog}
              className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded"
            >
              Delete
            </button>
            <button
              onClick={closeModal}
              className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded"
            >
              Cancel
            </button>
          </div>
        </div>
      </Modal>

      {/* //// */}
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
