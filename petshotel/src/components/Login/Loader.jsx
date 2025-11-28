import React from "react";

const Loader = () => {
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-white flex justify-center items-center z-50">
      <div
        className="w-16 h-16 border-[6px] border-t-transparent border-b-transparent rounded-full animate-spin"
        style={{
          borderLeft: "6px solid #003785",
          borderRight: "6px solid #93d1fa",
        }}
      ></div>
    </div>
  );
};

export default Loader;