import React from "react";
import Image from "next/image";

const CardLeft = () => {
  return (
    <div className="w-[550px] h-[540px] px-4 mx-5 my-5">
      <Image
        src="/cardLeft.png"
        alt="Card Left"
        width={500}
        height={300}
        layout="responsive"
        objectFit="cover"
      />
      <div className="py-5">
      <p className="text-[#6941C6] py-2">Olivia Rhye . 1 Jan 2023</p>
      <h2 className="font-bold text-2xl">UX review presentations</h2>
      <p className="font-light py-2">
        How do you create compelling presentations that wow your colleagues and
        impress your managers?
      </p>
      </div>
    </div>
  );
};

export default CardLeft;
