import React from "react";

const Loader = () => {
  return (
    <div className="flex min-h-screen items-center justify-center gap-2">
      <div className="h-3 w-3 animate-bounce rounded-full bg-black"></div>
      <div
        className="h-3 w-3 animate-bounce rounded-full bg-black"
        style={{ animationDelay: "0.15s" }}
      ></div>
      <div
        className="h-3 w-3 animate-bounce rounded-full bg-black"
        style={{ animationDelay: "0.3s" }}
      ></div>
    </div>
  );
};

export default Loader;