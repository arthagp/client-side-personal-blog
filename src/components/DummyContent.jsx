import React from "react";
import Image from "next/image";

const DummyContent = () => {
  return (
    <>
    {/* '/cardRightUp.jpeg' */}
      <div className="w-[350px] ml-[87px] mt-5">
        <div className="bg-slate-100 mx-auto rounded-lg shadow-xl">
          <div style={{ width: "100%", height: "100%" }}>
            <Image
              src='/cardRightUp.jpeg'
              alt="Image"
              layout="responsive"
              width={300}
              height={100}
            />
          </div>
          <div className="ml-3">
            <p className="text-[#6941C6] py-2">Olivia Rhye . 1 Jan 2023</p>
            <h2 className="font-bold text-xl">UX review presentations</h2>
            <p className="font-light py-2">
              How do you create compelling presentations that wow your
              colleagues and impress your managers?
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default DummyContent;
