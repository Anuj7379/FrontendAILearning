import React from "react";
import NotFoundImage from "../assets/404Image.png";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white/90 px-4 border-8 border-gray-900  shadow-lg">
      <img
        src={NotFoundImage}
        alt="404 Not Found"
        className="w-[500px] md:w-[800px] lg:w-[1000px] border-r-16 border-gray-900 rounded-4xl shadow-lg"
      />
    </div>
  );
};

export default NotFoundPage;
