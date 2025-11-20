import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="fixed w-full top-0 left-0 z-50">
      {/* Background glass + gradient */}
      <div className="backdrop-blur-lg bg-linear-to-r from-blue-700/70 via-indigo-700/60 to-purple-700/60 border-b border-white/10 shadow-xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          {/* Logo */}
          <h1
            className="text-2xl sm:text-3xl font-extrabold cursor-pointer select-none text-white drop-shadow-lg hover:scale-105 hover:text-yellow-300 transition-all duration-300"
            onClick={() => navigate("/")}
          >
            💰 Finance Tracker
          </h1>

          {/* Right side */}
          <div className="flex items-center gap-5">

            {/* User welcome text */}
            {user && (
              <span className="text-lg font-semibold text-white hidden md:block">
                Hi, <span className="text-yellow-300">{user.name}</span>
              </span>
            )}

            {/* Buttons */}
            {!user ? (
              <>
                <button
                  onClick={() => navigate("/login")}
                  className="px-5 py-2 rounded-lg font-semibold border border-yellow-400 text-yellow-300 hover:bg-yellow-400 hover:text-black transition-all duration-300 shadow-lg"
                >
                  Login
                </button>

                <button
                  onClick={() => navigate("/register")}
                  className="px-5 py-2 rounded-lg font-semibold bg-yellow-400 text-black hover:bg-yellow-500 transition-all duration-300 shadow-lg"
                >
                  Register
                </button>
              </>
            ) : (
              <button
                onClick={handleLogout}
                className="px-5 py-2 rounded-lg font-semibold bg-yellow-400 text-black hover:bg-yellow-500 transition-all duration-300 shadow-lg"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
