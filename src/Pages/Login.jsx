import { useState, useContext } from "react";
import API from "../api";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // NEW
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true); // start loading

    try {
      const res = await API.post("/user/login", formData);
      login(res.data);
      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    } finally {
      setIsSubmitting(false); // stop loading
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">

      {/* Background Image */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=1350&q=80')] bg-cover bg-center"></div>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

      {/* Glass Card */}
      <div className="relative z-10 w-full max-w-md bg-white/10 backdrop-blur-xl shadow-2xl border border-white/20 rounded-3xl p-8">

        <h2 className="text-3xl font-extrabold text-center text-white mb-8 tracking-wide drop-shadow-lg">
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-yellow-400 focus:ring-yellow-400 focus:ring-2 outline-none"
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          />

          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-gray-300 border border-white/30 focus:border-yellow-400 focus:ring-yellow-400 focus:ring-2 outline-none pr-12"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
            <span
              className="absolute right-3 top-1/2 -translate-y-1/2 text-white cursor-pointer"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
            </span>
          </div>

          {/* Submit Button */}
          <button
            disabled={isSubmitting}
            className={`w-full py-3 rounded-lg font-semibold text-lg transition-all shadow-lg 
              ${isSubmitting 
                ? "bg-yellow-300 cursor-not-allowed text-black" 
                : "bg-yellow-400 hover:bg-yellow-500 text-black"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.37 0 0 5.37 0 12h4z"
                  ></path>
                </svg>
                Logging in…
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <p className="mt-5 text-center text-gray-200 text-sm">
          Don't have an account?{" "}
          <span
            className="text-yellow-300 font-semibold cursor-pointer hover:underline"
            onClick={() => navigate("/register")}
          >
            Create account
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
