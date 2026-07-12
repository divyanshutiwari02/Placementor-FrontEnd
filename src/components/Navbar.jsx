import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <nav className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 
              onClick={() => navigate("/dashboard")} 
              className="text-2xl font-bold cursor-pointer hover:text-yellow-300 transition"
            >
              PlaceMentor
            </h1>
          </div>

          {token ? (
            <div className="flex items-center space-x-6">
              <button
                onClick={() => navigate("/dashboard")}
                className="hover:bg-white hover:text-indigo-600 px-4 py-2 rounded-lg transition font-medium"
              >
                Dashboard
              </button>
              <button
                onClick={() => navigate("/interview")}
                className="hover:bg-white hover:text-indigo-600 px-4 py-2 rounded-lg transition font-medium"
              >
                Mock Interview
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-500 hover:bg-red-600 px-5 py-2 rounded-lg font-semibold transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex space-x-4">
              <button onClick={() => navigate("/login")} className="hover:underline">Login</button>
              <button onClick={() => navigate("/register")} className="hover:underline">Register</button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}