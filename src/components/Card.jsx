// File Card
import React from "react";

const Card = ({ initUser, initDate, initTitle, initDesc }) => {
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

  return (
    <div className="bg-white p-4 rounded-lg shadow-lg">
      <img
        src="https://fakeimg.pl/350x200/ff0000/000"
        alt="fakeimage"
        className="w-full h-48 object-cover rounded-md"
      />
      <p className="mt-2 text-[#6941C6]">
        {initUser} - {formatDate(initDate)}
      </p>
      <h2 className="mt-2 font-bold text-xl">{initTitle}</h2>
      <p className="mt-2 font-light line-clamp-3">{initDesc}</p>
    </div>
  );
};

export default Card;
