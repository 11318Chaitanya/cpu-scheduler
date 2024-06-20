import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-3 text-white">
      <div className="container mx-auto relative flex items-center justify-end">
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 text-3xl">
          CPU Scheduler
        </div>
        <div className="flex space-x-1">
          <Link
            to="/about"
            className="active:bg-gray-200 active:rounded-full p-1"
          >
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
