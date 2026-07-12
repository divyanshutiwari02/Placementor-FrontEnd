import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {

    const token = localStorage.getItem("token");

    if (!token) {
      navigate("/");
      return;
    }

    fetch("https://place-d7ee.onrender.com/api/auth/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

      .then((res) => {

        if (!res.ok)
          throw new Error("Unauthorized");

        return res.json();
      })

      .then((data) => {

        setUser({
          name: data.name || "Student",
          email: data.email,
          interviews: data.interviews || 0,
          avgScore: data.avgScore || 0,
          strong: data.strongTopics || [],
          weak: data.weakTopics || [],
          topicScores: data.topicScores || {},
        });

      })

      .catch(() => {

        localStorage.removeItem("token");
        navigate("/");

      })

      .finally(() => setLoading(false));

  }, [navigate]);

  // LOADING

  if (loading) {

    return (

      <div className="min-h-screen flex items-center justify-center bg-gray-100">

        <div className="text-2xl font-bold text-indigo-600 animate-pulse">
          Loading your profile...
        </div>

      </div>
    );
  }

  if (!user) return null;

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-100 py-12">

      <div className="max-w-6xl mx-auto px-6">

        {/* HEADER */}

        <div className="bg-white rounded-3xl shadow-2xl p-10 mb-10 text-center">

          <h1 className="text-5xl font-extrabold text-indigo-700 mb-3">
            Welcome back, {user.name.split(" ")[0]} 
          </h1>

          <p className="text-xl text-gray-600">
            {user.email}
          </p>

         

        </div>

        {/* STATS */}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-10">

          {/* Interviews */}

          <div className="bg-white p-8 rounded-3xl shadow-xl text-center hover:scale-105 transition duration-300">

            <h2 className="text-6xl font-extrabold text-blue-600">
              {user.interviews}
            </h2>

            <p className="text-lg text-gray-600 mt-3">
              Interviews Completed
            </p>

          </div>

          {/* Avg Score */}

          <div className="bg-white p-8 rounded-3xl shadow-xl text-center hover:scale-105 transition duration-300">

            <h2 className="text-6xl font-extrabold text-green-600">
              7.6/10
            </h2>

            <p className="text-lg text-gray-600 mt-3">
              Average Score
            </p>

          </div>

          {/* Start Interview */}

          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 rounded-3xl shadow-xl flex items-center justify-center">

            <button
              onClick={() => navigate("/interview")}
              className=" text-white-700 px-8 py-4 rounded-2xl text-2xl font-bold shadow-lg hover:bg-indigo-50 hover:scale-105 transition duration-300"
            >
              Start New Interview
            </button>

          </div>

        </div>

        {/* FEATURE BUTTON */}

        <div className="mb-12">

          {/* ATS Resume Analyzer */}

          <button
            onClick={() => navigate("/resume")}
            className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white py-8 rounded-3xl shadow-xl hover:scale-105 transition duration-300"
          >

            <h2 className="text-3xl font-bold mb-2">
              ATS Resume Analyzer
            </h2>

            <p className="text-lg opacity-90">
              Analyze resume with AI feedback
            </p>

          </button>

        </div>

        {/* STRONG & WEAK AREAS */}

        <div className="grid md:grid-cols-2 gap-8 mb-10">

          {/* Strong Areas */}

          <div className="bg-white p-8 rounded-3xl shadow-xl">

            <h2 className="text-3xl font-bold text-green-600 mb-6 text-center">
              Strong Areas
            </h2>

            {user.strong.length > 0 ? (

              <div className="space-y-4">

                {user.strong.map((topic) => (

                  <div
                    key={topic}
                    className="bg-green-100 text-green-800 px-6 py-4 rounded-2xl text-lg font-semibold text-center"
                  >
                    {topic}
                  </div>

                ))}

              </div>

            ) : (

              <p className="text-center text-gray-500 text-lg">
                Complete interviews to see strengths!
              </p>

            )}

          </div>

          {/* Weak Areas */}

          <div className="bg-white p-8 rounded-3xl shadow-xl">

            <h2 className="text-3xl font-bold text-red-600 mb-6 text-center">
              Needs Improvement
            </h2>

            {user.weak.length > 0 ? (

              <div className="space-y-4">

                {user.weak.map((topic) => (

                  <div
                    key={topic}
                    className="bg-red-100 text-red-800 px-6 py-4 rounded-2xl text-lg font-semibold text-center"
                  >
                    {topic}
                  </div>

                ))}

              </div>

            ) : (

              <p className="text-center text-gray-500 text-lg">
                You're doing great! Keep practicing.
              </p>

            )}

          </div>

        </div>

        {/* TOPIC SCORES */}

        <div className="bg-white p-8 rounded-3xl shadow-xl">

          <h2 className="text-3xl font-bold text-indigo-700 mb-6 text-center">
            Topic Scores
          </h2>

          {Object.keys(user.topicScores).length > 0 ? (

            <div className="space-y-4">

              {Object.entries(user.topicScores).map(([topic, score]) => (

                <div
                  key={topic}
                  className="flex justify-between items-center bg-indigo-100 px-6 py-4 rounded-2xl"
                >

                  <span className="font-semibold text-lg">
                    {topic}
                  </span>

                  <span className="font-bold text-indigo-700">
                    {score}/10
                  </span>

                </div>

              ))}

            </div>

          ) : (

            <p className="text-center text-gray-500">
              No topic data available yet.
            </p>

          )}

        </div>

      </div>

    </div>
  );
}