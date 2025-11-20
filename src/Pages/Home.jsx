// src/Pages/Home.jsx
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { AuthContext } from "../Context/AuthContext";

const Home = () => {
  const navigate = useNavigate();
  const{user} = useContext(AuthContext)
  return (
    <div className="relative min-h-screen flex flex-col">
      <Navbar />

      {/* Background image covers full remaining area */}
      <section
        className="flex-1 flex justify-center items-center bg-cover bg-center bg-no-repeat relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2070&auto=format&fit=crop')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55 backdrop-blur-sm"></div>

        {/* Center content */}
        <div className="relative z-10 text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg">
            Manage Your Money Smartly
          </h1>
          <p className="text-gray-200 max-w-xl mx-auto mb-6 text-lg">
            Track your income & expenses effortlessly. Take control of your financial future.
          </p>

          <button
            onClick={() => navigate(user ? "/dashboard" : "/login")}
            className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-semibold transition shadow-lg"
          >
            Go to Dashboard
          </button>
        </div>
      </section>
    </div>
  );
};

export default Home;
