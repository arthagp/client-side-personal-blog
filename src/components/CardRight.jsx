import React from "react";
import Image from "next/image";

const CardRight = () => {
  return (
    <div className="flex justify-center items-center px-4 mx-5 h-[250px]">
      <Image src={"/cardRightUp.jpeg"} width={300} height={100} />
      <div className="ml-3">
        <p className="text-[#6941C6] py-2">Olivia Rhye . 1 Jan 2023</p>
        <h2 className="font-bold text-xl">UX review presentations</h2>
        <p className="font-light py-2">
          How do you create compelling presentations that wow your colleagues
          and impress your managers?
        </p>
      </div>
    </div>
  );
};

export default CardRight;
