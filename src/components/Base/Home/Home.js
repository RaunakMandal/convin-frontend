import React from "react";
import Navbar from "../Navbar/Navbar";

const Home = ({ children }) => {
  return (
    <div className="flex flex-col items-stretch min-h-screen">
      <Navbar />
      {children}
    </div>
  );
};

export default Home;