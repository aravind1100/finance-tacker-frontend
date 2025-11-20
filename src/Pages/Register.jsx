import { useState } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/user/register", formData);
      alert("Registered successfully ✅");
      navigate("/login");
    } catch (err) {
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* ✅ Background Image + Overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* ✅ Glass Register Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 rounded-3xl p-8">

        <h2 className="text-3xl font-extrabold text-center text-white mb-8 tracking-wide drop-shadow-lg">
          Create Account ✨
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <input
            type="text"
            placeholder="User Name"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-yellow-400 focus:ring-yellow-400 focus:ring-2 outline-none"
            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-yellow-400 focus:ring-yellow-400 focus:ring-2 outline-none"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-yellow-400 focus:ring-yellow-400 focus:ring-2 outline-none"
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          />

          <button className="w-full py-3 rounded-lg bg-yellow-400 text-black font-semibold text-lg hover:bg-yellow-500 transition-all shadow-lg">
            Register
          </button>
        </form>

        <p className="mt-5 text-center text-gray-200 text-sm">
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            className="text-yellow-300 font-semibold cursor-pointer hover:underline"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
}
