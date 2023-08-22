import React from "react";
import Image from "next/image";

const Message = ({ comment, initDate, initUserComment }) => {
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

  return (
    <div className="flex items-center space-x-2 p-2 border rounded-md shadow-md mt-4">
      <div className="w-8 h-8">
        <Image src="/user.png" width={35} height={35} alt="user_comment" />
      </div>
      <div>
        <p className="text-slate-600 text-sm">{initUserComment}</p>
        <p className="text-gray-200 text-sm">{formatDate(initDate)}</p>
        <p className="text-sm">{comment}</p>
      </div>
    </div>
  );
};

export default Message;
