import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem("token");

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 text-center text-white">
        <h1 className="text-6xl md:text-8xl font-bold mb-6 animate-fade-in">
          PlaceMentor
        </h1>
        <p className="text-2xl md:text-4xl font-light mb-8 max-w-4xl">
          Your Personal AI Interview Coach for <span className="font-bold text-yellow-300">TCS • Infosys • Wipro • Accenture</span>
        </p>
        <p className="text-lg md:text-xl mb-12 max-w-3xl opacity-90">
          Practice unlimited mock interviews with <strong>Gemini 1.5 Flash AI</strong> — get instant feedback, score, and improvement tips just like a real interviewer!
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6">
          {isLoggedIn ? (
            <button
              onClick={() => navigate("/dashboard")}
              className="px-10 py-5 bg-white text-indigo-700 text-xl font-bold rounded-2xl hover:bg-gray-100 transform hover:scale-105 transition shadow-2xl"
            >
              Go to Dashboard
            </button>
          ) : (
            <>
              <button
                onClick={() => navigate("/register")}
                className="px-10 py-5 bg-yellow-400 text-indigo-900 text-xl font-bold rounded-2xl hover:bg-yellow-300 transform hover:scale-110 transition shadow-2xl"
              >
                Start Free Now
              </button>
              <button
                onClick={() => navigate("/login")}
                className="px-10 py-5 bg-transparent border-4 border-white text-white text-xl font-bold rounded-2xl hover:bg-white hover:text-indigo-700 transition shadow-2xl"
              >
                Login
              </button>
            </>
          )}
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
            <h3 className="text-2xl font-bold mb-3">Real AI Feedback</h3>
            <p className="opacity-90">Powered by Google Gemini 1.5 Flash — better than human in technical depth</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
            <h3 className="text-2xl font-bold mb-3">100% Free Forever</h3>
            <p className="opacity-90">No payment, no limit — practice 24×7</p>
          </div>
          <div className="bg-white/10 backdrop-blur-lg p-8 rounded-2xl border border-white/20">
            <h3 className="text-2xl font-bold mb-3">Placement Ready</h3>
            <p className="opacity-90">Java, Spring Boot, DBMS, OS — exactly what companies ask</p>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 text-sm opacity-70">
          Made with ❤️ for MCA Students | 2025–2026 Batch
        </footer>
      </div>
    </div>
  );
}