import { useState } from "react";
import { loginUser } from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await loginUser({ email, password });
      const data = await response.json();

      if (response.ok && data.token) {
        // SUCCESS – SAVE TOKEN & REDIRECT
        localStorage.setItem("token", data.token);
        localStorage.setItem("userName", data.name || "Student");
        localStorage.setItem("userEmail", data.email);

        navigate("/dashboard");
      } else {
        setError(data.message || "Invalid email or password");
      }
    } catch (err) {
      setError("Backend not running or network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 to-purple-700 flex items-center justify-center p-6">
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">
        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-8">
          PlaceMentor
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 outline-none text-lg"
            required
            disabled={loading}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-5 py-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 outline-none text-lg"
            required
            disabled={loading}
          />

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-4 rounded-xl text-white font-bold text-xl transition ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-2xl"
            }`}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {error && (
          <div className="mt-6 p-4 bg-red-100 border-2 border-red-300 text-red-700 rounded-xl text-center font-medium">
            {error}
          </div>
        )}

        <p className="text-center mt-8 text-gray-600">
          Don't have an account?{" "}
          <a href="/register" className="text-indigo-600 font-bold hover:underline">
            Register here
          </a>
        </p>
      </div>
    </div>
  );
}