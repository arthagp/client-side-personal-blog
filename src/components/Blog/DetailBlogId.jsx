import React from "react";

const DetailBlogId = ({ initDate, initTitle, initDesc, initTags }) => {
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

  return (
    <div className="bg-slate-300 text-black p-5 rounded-lg shadow-lg">
      <p className="text-sm text-gray-500">{formatDate(initDate)}</p>
      <h2 className="text-xl font-semibold mt-2">{initTitle}</h2>
      <img
        src="https://fakeimg.pl/450x300/ff0000/000"
        alt="fakeimage"
        className="w-full h-48 object-cover mt-4 rounded-md"
      />
      <p className="mt-4">{initDesc}</p>
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
    </div>
  );
};

export default DetailBlogId;
