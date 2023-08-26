import React, { useState } from "react";
import Message from "./Message";
import { createComment } from "@/app/api/fetch";
import Cookies from "js-cookie";

const Comments = ({ comments, postId, onCommentAdded, authorId}) => {
  const [comment, setComment] = useState("");
  const [isComment, isSetComment] = useState(false);
  const [isLogged, setIsLogged] = useState(false);

  const getUsernameAtCookies = Cookies.get("username");

  const handleInputChange = (e) => {
    if (!getUsernameAtCookies || null) {
      return setIsLogged(true);
    }
    setComment(e.target.value);
  };

  const handleCreateComment = async (e) => {
    e.preventDefault();

    if (!comment.trim()) { //menghapus spasi di awal dan akhir sebuah string, sehingga ini string tidak bisa kosong dengan char
      return isSetComment(true);
    }
  
    try {
      const response = await createComment({ postId, comment });
      // console.log(response.data.data.id)

      if (response) {
        const newComment = {
          id: response.data.id,
          comment: comment,
          createdAt: new Date().toISOString(),
          User: {
            username: `${getUsernameAtCookies}`,
          },
        };
        onCommentAdded(newComment); // melemapar fungsi dengan argumen berisi object createComment dilemparkan ke component DetailBlogId. agar ngetrigger render
      }
      setComment("");
    } catch (error) {
      console.log("Error creating comment:", error);
    }
  };
  

  return (
    <div className="border p-4 rounded-md shadow-md">
      <h2 className="text-lg font-semibold mb-2">Comments</h2>
      {isLogged ? (
        <p className="font-sm text-red-500">
          Login First if you want to comment
        </p>
      ) : (
        <form onSubmit={handleCreateComment}>
          <input
            type="text"
            placeholder="Add your comment here..."
            className="w-full p-2 border rounded-md"
            value={comment}
            onChange={handleInputChange}
          />
          {isComment ? (
            <p className="text-sm text-red-500">
              At Least 1 Character to comment
            </p>
          ) : null}
          <button
            type="submit"
            className="mt-2 py-1 px-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Add Comment
          </button>
        </form>
      )}

      <div className="mt-4">
        {comments // melakukan reverse artinya yang terbaru berada di paling atas
          .slice()
          .reverse()
          .map((comment) => (
            <Message
              key={comment.createdAt}
              comment={comment.comment}
              initDate={comment.createdAt}
              initUserComment={comment.User.username}
              author={comment.user_id === authorId ? `author` : null}
              commentId={comment.id}
              currentUsername={getUsernameAtCookies}
            />
          ))}
        
      </div>
    </div>
  );
};

export default Comments;
