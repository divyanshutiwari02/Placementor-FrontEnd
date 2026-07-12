import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ResumeAnalyzer() {

  const [file, setFile] = useState(null);

  const [result, setResult] = useState(null);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // =========================
  // FILE HANDLER
  // =========================
  const handleFile = (e) => {

    const selected = e.target.files[0];

    if (!selected) return;

    if (selected.type !== "application/pdf") {

      alert("Only PDF files allowed");

      return;
    }

    setFile(selected);
  };

  // =========================
  // SUBMIT FUNCTION
  // =========================
  const handleSubmit = async () => {

    if (!file) {

      alert("Upload resume first");

      return;
    }

    const token = localStorage.getItem("token");

    if (!token) {

      alert("Please login first");

      navigate("/");

      return;
    }

    setLoading(true);

    setResult(null);

    try {

      const formData = new FormData();

      formData.append("resume", file);

      // =========================
      // API CALL
      // =========================
      const res = await fetch(
        "https://place-d7ee.onrender.com/api/resume/analyze",
        {
          method: "POST",

          headers: {
            Authorization: `Bearer ${token}`,
          },

          body: formData,
        }
      );

      const data = await res.json();

      if (res.ok) {

        setResult(data);

      } else {

        alert(data.message || "Analysis failed");
      }

    } catch (err) {

      console.error(err);

      alert("Backend not running!");

    } finally {

      setLoading(false);
    }
  };

  // =========================
  // SCORE COLOR
  // =========================
  const getScoreColor = () => {

    if (!result) return "text-gray-700";

    if (result.atsScore >= 80)
      return "text-green-600";

    if (result.atsScore >= 60)
      return "text-yellow-500";

    return "text-red-600";
  };

  // =========================
  // SCORE STATUS
  // =========================
  const getStatus = () => {

    if (!result) return null;
  
    // EXCELLENT
    if (result.atsScore >= 80) {

      return (
        <div className="mt-8 text-center">
    
          <h2 className="text-4xl font-bold text-green-600 mb-4">
            Excellent Resume
          </h2>
    
          {/* AUTO PLAY SOUND */}
          
    
        </div>
      );
    }
  
    // GOOD
    if (result.atsScore >= 60) {

      return (
        <div className="mt-8 text-center">
    
          <h2 className="text-4xl font-bold text-yellow-500 mb-4">
            Good Resume
          </h2>
    
          {/* AUTO PLAY SOUND */}
         
    
        </div>
      );
    }
  
    // LOW SCORE
    return (
      <h2 className="text-4xl font-bold mt-8 text-red-600 text-center">
        Needs Improvement
      </h2>
    );
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 p-6">

      <div className="max-w-6xl mx-auto">

        {/* ========================= */}
        {/* HEADER */}
        {/* ========================= */}
        <div className="text-center mb-10">

          <h1 className="text-5xl font-extrabold text-indigo-800">

            AI ATS Resume Analyzer

          </h1>

          <p className="text-gray-600 mt-4 text-lg">

            Upload Resume & Get AI ATS Score

          </p>
        </div>

        {/* ========================= */}
        {/* MAIN CARD */}
        {/* ========================= */}
        <div className="bg-white rounded-3xl shadow-2xl p-10">

          {/* ========================= */}
          {/* FILE UPLOAD */}
          {/* ========================= */}
          <div className="border-4 border-dashed border-indigo-300 rounded-3xl p-10 text-center bg-indigo-50">

            <h2 className="text-3xl font-bold mb-4 text-indigo-700">

              Upload Resume PDF

            </h2>

            <label className="cursor-pointer bg-indigo-600 hover:bg-indigo-700 transition text-white px-8 py-4 rounded-2xl font-bold inline-block">

              Choose Resume

              <input
                type="file"
                accept=".pdf"
                onChange={handleFile}
                className="hidden"
              />
            </label>

            {file && (

              <div className="mt-6 text-green-700 font-semibold text-lg">

                {file.name}

              </div>
            )}
          </div>

          {/* ========================= */}
          {/* BUTTON */}
          {/* ========================= */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full mt-10 py-5 rounded-2xl text-2xl font-bold text-white transition-all duration-300
              
              ${
                loading
                  ? "bg-gray-400"
                  : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-[1.01]"
              }
            `}
          >

            {loading
              ? "Analyzing Resume..."
              : "Check ATS Score"}

          </button>

          {/* ========================= */}
          {/* RESULT */}
          {/* ========================= */}
          {result && (

            <div className="mt-14">

              {/* ========================= */}
              {/* SCORE SECTION */}
              {/* ========================= */}
              <div className="text-center mb-12">

                <div
                  className={`w-56 h-56 mx-auto rounded-full border-[10px] flex items-center justify-center text-6xl font-extrabold shadow-xl

                  ${
                    result.atsScore >= 80
                      ? "border-green-500 text-green-600"
                      : result.atsScore >= 60
                      ? "border-yellow-400 text-yellow-500"
                      : "border-red-500 text-red-600"
                  }`}
                >

                  {result.atsScore}%

                </div>

                <h2
                  className={`text-4xl font-bold mt-8 ${getScoreColor()}`}
                >

                  {getStatus()}

                </h2>
              </div>

              {/* ========================= */}
              {/* SCORE CARDS */}
              {/* ========================= */}
              <div className="grid md:grid-cols-4 gap-5 mb-12">

                <div className="bg-indigo-100 p-5 rounded-2xl shadow">

                  <h3 className="font-bold text-indigo-700">
                    Keyword Score
                  </h3>

                  <p className="text-3xl font-bold mt-3">
                    {result.keywordScore}/35
                  </p>
                </div>

                <div className="bg-purple-100 p-5 rounded-2xl shadow">

                  <h3 className="font-bold text-purple-700">
                    Skills Score
                  </h3>

                  <p className="text-3xl font-bold mt-3">
                    {result.skillsScore} /20
                  </p>
                </div>

                <div className="bg-pink-100 p-5 rounded-2xl shadow">

                  <h3 className="font-bold text-pink-700">
                    Experience Score
                  </h3>

                  <p className="text-3xl font-bold mt-3">
                    {result.experienceScore}/15
                  </p>
                </div>

                <div className="bg-blue-100 p-5 rounded-2xl shadow">

                  <h3 className="font-bold text-blue-700">
                    Education Score
                  </h3>

                  <p className="text-3xl font-bold mt-3">
                    {result.educationScore}/10
                  </p>
                </div>

                <div className="bg-green-100 p-5 rounded-2xl shadow">

                  <h3 className="font-bold text-green-700">
                    Format Score
                  </h3>

                  <p className="text-3xl font-bold mt-3">
                    {result.formatScore}/10
                  </p>
                </div>

                <div className="bg-yellow-100 p-5 rounded-2xl shadow">

                  <h3 className="font-bold text-yellow-700">
                    Project Score
                  </h3>

                  <p className="text-3xl font-bold mt-3">
                    {result.projectScore}/5
                  </p>
                </div>

                <div className="bg-red-100 p-5 rounded-2xl shadow">

                  <h3 className="font-bold text-red-700">
                    Contact Score
                  </h3>

                  <p className="text-3xl font-bold mt-3">
                    {result.contactScore}/5
                  </p>
                </div>

                <div className="bg-cyan-100 p-5 rounded-2xl shadow">

                  <h3 className="font-bold text-cyan-700">
                    AI Similarity
                  </h3>

                  <p className="text-3xl font-bold mt-3">
                    {result.aiSimilarityScore || 0}/20
                  </p>
                </div>
              </div>

              {/* ========================= */}
              {/* DETECTED SKILLS */}
              {/* ========================= */}
              <div className="bg-indigo-50 p-8 rounded-3xl shadow mb-10">

                <h3 className="text-3xl font-bold text-indigo-800 mb-5">

                  Detected Skills

                </h3>

                <div className="flex flex-wrap gap-3">

                  {(result.detectedSkills || []).map(
                    (item, index) => (

                      <span
                        key={index}
                        className="bg-indigo-200 text-indigo-900 px-4 py-2 rounded-full font-semibold"
                      >

                        {item}

                      </span>
                    )
                  )}
                </div>
              </div>

              {/* ========================= */}
              {/* AI SUGGESTIONS */}
              {/* ========================= */}
              <div className="mt-12 bg-indigo-50 p-8 rounded-3xl shadow">

                <h3 className="text-3xl font-bold text-indigo-800 mb-6">

                  AI Suggestions

                </h3>

                <ul className="space-y-4">

                  {(result.improvements || []).map(
                    (item, index) => (

                      <li
                        key={index}
                        className="bg-white p-5 rounded-2xl shadow"
                      >

                        {item}

                      </li>
                    )
                  )}
                </ul>
              </div>

            </div>
          )}
        </div>
      </div>
    </div>
  );
}