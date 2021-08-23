import React from "react";

const Navbar = () => {
  const darkModeToggle = () => {
    const root = window.document.documentElement;
    root.classList.toggle("dark");
  };
  return (
    <nav className="py-5 dark:bg-gray-700 shadow-md">
      <div className="container flex justify-between items-center">
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">
          Where in the world?
        </h1>
        <button
          onClick={darkModeToggle}
          className="flex gap-3 items-center text-gray-700 dark:text-gray-50"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
            />
          </svg>
          <p>Dark Mode</p>
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
