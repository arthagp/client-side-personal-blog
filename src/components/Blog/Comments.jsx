import React, { useState } from "react";
import Message from "./Message";
import { createComment } from "@/app/api/fetch";
import Cookies from "js-cookie";

const Comments = ({ comments, postId, onCommentAdded }) => {
  const [comment, setComment] = useState("");

  const handleInputChange = (e) => {
    setComment(e.target.value);
  };

  const getUsernameAtCookies = Cookies.get('username')

  const handleCreateComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) {
      return;
    }

    try {
      const response = await createComment({ postId, comment });

      const newComment = {
        id: response.data.id,
        comment: comment,
        createdAt: new Date().toISOString(),
        User: {
          username: `${getUsernameAtCookies}`, // Replace with the actual username
        },
      };

      onCommentAdded(newComment); // Call the parent's function to add the new comment
      setComment(""); // Clear the input field after successful comment creation
    } catch (error) {
      console.log("Error creating comment:", error);
    }
  };
  return (
    <div className="border p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-2">Comments</h2>
      <form onSubmit={handleCreateComment}>
        <input
          type="text"
          placeholder="Add your comment here..."
          className="w-full p-2 border rounded-md"
          value={comment}
          onChange={handleInputChange}
        />
        <button
          type="submit"
          className="mt-2 py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Add Comment
        </button>
      </form>
      <div className="mt-4">
        {comments.map((comment) => (
          <Message
            key={comment.createdAt}
            comment={comment.comment}
            initDate={comment.createdAt}
            initUserComment={comment.User.username}
          />
        ))}
      </div>
    </div>
  );
};

export default Comments;
