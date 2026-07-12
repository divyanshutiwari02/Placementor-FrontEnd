import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    try {
      const data = await registerUser(formData);

      setMessage(data.message || "Registration successful!");

      setTimeout(() => {
        navigate("/");
      }, 2000);

    } catch (err) {
      setMessage(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 to-indigo-700 flex items-center justify-center p-4">
      
      <div className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-md">

        <h2 className="text-4xl font-bold text-center text-indigo-700 mb-2">
          PlaceMentor
        </h2>

        <p className="text-center text-gray-600 mb-8">
          Create your account
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 outline-none"
          />

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 outline-none"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-indigo-500 outline-none"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg hover:scale-105 transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>

        </form>

        {message && (
          <div
            className={`mt-6 p-4 rounded-xl text-center font-semibold ${
              message.toLowerCase().includes("successful")
                ? "bg-green-100 text-green-700 border border-green-300"
                : "bg-red-100 text-red-700 border border-red-300"
            }`}
          >
            {message}
          </div>
        )}

        <p className="text-center mt-8 text-gray-600">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-indigo-600 font-bold hover:underline"
          >
            Login here
          </Link>
        </p>

      </div>
    </div>
  );
}