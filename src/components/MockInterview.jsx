import { useState } from "react";
import { getDeepAIFeedback } from "../services/gemini";

/* =========================
   QUESTION BANK
========================= */
const QUESTION_BANK = {
  language: {
    Java: [
      "Explain Java Streams API.",
      "Difference between == and equals() in Java.",
      "What is JVM, JDK, and JRE?",
      "Explain OOP concepts in Java.",
      "What is multithreading in Java?",
      "Difference between ArrayList and LinkedList.",
      "Explain Exception Handling in Java.",
      "What is garbage collection?",
      "Explain Java Collections Framework.",
      "Difference between HashMap and Hashtable.",
      "What is abstraction in Java?",
      "Explain interfaces in Java.",
      "Difference between method overloading and overriding.",
      "What are lambda expressions?",
      "Explain synchronization in Java.",
      "What is serialization in Java?",
      "Explain final, finally, and finalize.",
      "What is the difference between stack and heap memory?",
      "Explain constructor chaining.",
      "What are access modifiers in Java?"
    ],

    Python: [
      "What are Python decorators?",
      "Explain list vs tuple in Python.",
      "What is PEP8?",
      "Explain Python generators.",
      "What is lambda function in Python?",
      "Difference between deep copy and shallow copy.",
      "Explain Python modules and packages.",
      "What is exception handling in Python?",
      "Explain list comprehensions.",
      "Difference between append() and extend().",
      "What are Python dictionaries?",
      "Explain Python OOP concepts.",
      "What is __init__ method?",
      "Difference between Python 2 and Python 3.",
      "Explain Python virtual environments.",
      "What is inheritance in Python?",
      "Explain multithreading in Python.",
      "What are Python iterators?",
      "Explain *args and **kwargs.",
      "What is monkey patching?"
    ],

    JavaScript: [
      "Explain closures in JavaScript.",
      "Difference between var, let, and const.",
      "Explain event bubbling.",
      "What is hoisting in JavaScript?",
      "Explain promises in JavaScript.",
      "What is async/await?",
      "Difference between null and undefined.",
      "Explain callback functions.",
      "What is the DOM?",
      "Explain event delegation.",
      "Difference between == and ===.",
      "What are arrow functions?",
      "Explain JavaScript scope.",
      "What is JSON?",
      "Explain prototype inheritance.",
      "What is a higher-order function?",
      "Explain debouncing and throttling.",
      "What is localStorage and sessionStorage?",
      "Explain JavaScript event loop.",
      "Difference between synchronous and asynchronous programming."
    ]
  },

  frontend: {
    React: [
      "Explain React Virtual DOM.",
      "Difference between useEffect and useMemo.",
      "How does React state management work?",
      "What is JSX?",
      "Explain React hooks.",
      "What is useState in React?",
      "Explain props in React.",
      "Difference between functional and class components.",
      "What is React Router?",
      "Explain controlled components.",
      "What is Redux?",
      "Explain context API.",
      "What is lazy loading in React?",
      "Explain React lifecycle methods.",
      "Difference between state and props.",
      "What are keys in React?",
      "Explain React fragments.",
      "What is prop drilling?",
      "Explain memoization in React.",
      "What is server-side rendering in React?"
    ],

    Angular: [
      "Explain dependency injection in Angular.",
      "What are Angular directives?",
      "Explain Angular lifecycle hooks.",
      "What is Angular CLI?",
      "Explain Angular modules.",
      "What is data binding in Angular?",
      "Explain Angular services.",
      "What is RxJS?",
      "Difference between ngIf and ngFor.",
      "What are Angular pipes?",
      "Explain Angular routing.",
      "What is two-way data binding?",
      "Explain reactive forms in Angular.",
      "What is lazy loading in Angular?",
      "Difference between template-driven and reactive forms.",
      "Explain observables in Angular.",
      "What are components in Angular?",
      "Explain Angular guards.",
      "What is interpolation in Angular?",
      "Explain Angular change detection."
    ]
  },

  backend: {
    SpringBoot: [
      "Explain Spring Boot Auto Configuration.",
      "What is dependency injection in Spring?",
      "Explain Spring Security.",
      "What is Spring MVC?",
      "Explain REST APIs in Spring Boot.",
      "What is Spring Data JPA?",
      "Explain @Autowired annotation.",
      "What is application.properties?",
      "Explain Hibernate in Spring Boot.",
      "What is microservices architecture?",
      "Explain bean lifecycle in Spring.",
      "What is JWT authentication?",
      "Explain Spring Boot starters.",
      "Difference between @Component, @Service, and @Repository.",
      "What is CORS?",
      "Explain exception handling in Spring Boot.",
      "What is pagination in Spring Boot?",
      "Explain Spring Boot Actuator.",
      "What is Maven?",
      "Explain dependency management in Spring Boot."
    ],

    NodeJS: [
      "What is Express.js?",
      "Explain middleware in Node.js.",
      "What is event loop in Node.js?",
      "What is npm?",
      "Explain asynchronous programming in Node.js.",
      "What is package.json?",
      "Explain REST API in Node.js.",
      "What is callback hell?",
      "Explain JWT authentication in Node.js.",
      "What is CORS in Node.js?",
      "Difference between require and import.",
      "What is MongoDB with Node.js?",
      "Explain error handling in Node.js.",
      "What are streams in Node.js?",
      "Explain file system module.",
      "What is dotenv package?",
      "Explain routing in Express.js.",
      "What is nodemon?",
      "Difference between SQL and NoSQL databases.",
      "Explain WebSockets in Node.js."
    ]
  },

  technology: {
    Docker: [
      "Explain Docker containers.",
      "What is Docker Compose?",
      "What is a Dockerfile?",
      "Difference between Docker image and container.",
      "Explain Docker volumes.",
      "What is containerization?",
      "Explain Docker networking.",
      "What is Kubernetes?",
      "Difference between virtualization and containerization.",
      "Explain Docker Hub.",
      "What is port mapping in Docker?",
      "Explain Docker commands.",
      "What is a multi-stage build?",
      "Explain Docker Swarm.",
      "What is orchestration?",
      "Explain container scaling.",
      "What is a Docker registry?",
      "Explain Docker caching.",
      "What are environment variables in Docker?",
      "Explain CI/CD with Docker."
    ],

    Git: [
      "Explain Git branching.",
      "Difference between merge and rebase.",
      "What is Git stash?",
      "What is GitHub?",
      "Explain Git pull and Git fetch.",
      "What is version control?",
      "Explain Git commit.",
      "Difference between fork and clone.",
      "What is pull request?",
      "Explain Git conflicts.",
      "What is Git reset?",
      "Explain Git cherry-pick.",
      "Difference between Git revert and reset.",
      "What is Git tag?",
      "Explain Git workflow.",
      "What is Git HEAD?",
      "Explain .gitignore file.",
      "What is Git squash?",
      "Explain branching strategies.",
      "What is CI/CD integration with Git?"
    ]
  },

  database: {
    MySQL: [
      "Explain ACID properties in MySQL.",
      "What are joins in SQL?",
      "Explain indexing in MySQL.",
      "What is normalization?",
      "Explain primary key and foreign key.",
      "Difference between DELETE, DROP, and TRUNCATE.",
      "What is a stored procedure?",
      "Explain SQL constraints.",
      "What is denormalization?",
      "Explain transactions in MySQL.",
      "Difference between WHERE and HAVING.",
      "What are views in SQL?",
      "Explain GROUP BY clause.",
      "What is a subquery?",
      "Explain UNION and UNION ALL.",
      "Difference between clustered and non-clustered index.",
      "What is SQL injection?",
      "Explain triggers in MySQL.",
      "What are aggregate functions?",
      "Difference between CHAR and VARCHAR."
    ],

    MongoDB: [
      "Difference between SQL and MongoDB.",
      "Explain MongoDB collections.",
      "What is aggregation pipeline?",
      "What are MongoDB documents?",
      "Explain indexing in MongoDB.",
      "What is sharding?",
      "Explain replication in MongoDB.",
      "Difference between find() and aggregate().",
      "What is BSON?",
      "Explain MongoDB Compass.",
      "What are embedded documents?",
      "Explain CRUD operations in MongoDB.",
      "What is ObjectId?",
      "Explain schema design in MongoDB.",
      "Difference between updateOne and updateMany.",
      "What is MongoDB Atlas?",
      "Explain MongoDB transactions.",
      "What are capped collections?",
      "Explain data modeling in MongoDB.",
      "What is NoSQL database?"
    ]
  }
};

export default function MockInterview() {

  /* =========================
     STATES
  ========================= */

  const [category, setCategory] = useState("language");

  const [subCategory, setSubCategory] =
    useState("Java");

  const [question, setQuestion] =
    useState(
      QUESTION_BANK.language.Java[0]
    );

  const [answer, setAnswer] =
    useState("");

  const [feedback, setFeedback] =
    useState(null);

  const [loading, setLoading] =
    useState(false);

  const [history, setHistory] =
    useState([]);

  const [completed, setCompleted] =
    useState(false);

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = async () => {

    if (!answer.trim()) {
      return alert(
        "Please write your answer!"
      );
    }

    setLoading(true);
    setFeedback("");

    try {

      const aiResponse =
        await getDeepAIFeedback(
          question,
          answer,
          history
        );

      setFeedback(aiResponse);

      setHistory((prev) => [
        ...prev,
        { question, answer }
      ]);

    } catch (err) {

      setFeedback(
        "AI Error: Check API key or internet."
      );

    } finally {

      setLoading(false);
    }
  };

  /* =========================
     NEXT QUESTION
  ========================= */

  const generateNextQuestion = () => {

    const questions =
      QUESTION_BANK[category][subCategory];

    const randomQuestion =
      questions[
        Math.floor(
          Math.random() *
          questions.length
        )
      ];

    setQuestion(randomQuestion);

    setAnswer("");
    setFeedback("");
  };

  /* =========================
     COMPLETE INTERVIEW
  ========================= */

  const handleCompleteInterview = () => {

    setCompleted(true);
  };

  /* =========================
     CATEGORY CHANGE
  ========================= */

  const handleCategoryChange = (e) => {

    const selectedCategory =
      e.target.value;

    setCategory(selectedCategory);

    const firstSubCategory =
      Object.keys(
        QUESTION_BANK[selectedCategory]
      )[0];

    setSubCategory(firstSubCategory);

    setQuestion(
      QUESTION_BANK[selectedCategory][
        firstSubCategory
      ][0]
    );

    setAnswer("");
    setFeedback("");
  };

  /* =========================
     SUB CATEGORY CHANGE
  ========================= */

  const handleSubCategoryChange = (
    e
  ) => {

    const selectedSubCategory =
      e.target.value;

    setSubCategory(
      selectedSubCategory
    );

    setQuestion(
      QUESTION_BANK[category][
        selectedSubCategory
      ][0]
    );

    setAnswer("");
    setFeedback("");
  };

  return (

    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-100 py-12 px-4">

      <div className="max-w-4xl mx-auto">

        {/* TITLE */}

        <h1 className="text-4xl font-bold text-center text-indigo-800 mb-8">
          Deep AI Mock Interview
        </h1>

        {/* HISTORY */}

        {history.length > 0 && (

          <div className="bg-gray-100 p-4 rounded-xl mb-6">

            <h3 className="font-bold text-gray-700 mb-2">
              Previous Sessions:
            </h3>

            {history.map((h, i) => (

              <p
                key={i}
                className="text-sm text-gray-600 mb-1"
              >
                Q: {h.question}
              </p>

            ))}

          </div>
        )}

        {/* MAIN CARD */}

        <div className="bg-white p-8 rounded-3xl shadow-2xl">

          {/* CATEGORY FILTER */}

          <div className="grid md:grid-cols-2 gap-4 mb-6">

            {/* MAIN CATEGORY */}

            <div>

              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Select Category
              </label>

              <select
                value={category}
                onChange={
                  handleCategoryChange
                }
                className="w-full p-4 border-2 border-gray-300 rounded-2xl outline-none"
              >

                <option value="language">
                  Language
                </option>

                <option value="frontend">
                  Frontend
                </option>

                <option value="backend">
                  Backend
                </option>

                <option value="technology">
                  Technology
                </option>

                <option value="database">
                  Database
                </option>

              </select>

            </div>

            {/* SUB CATEGORY */}

            <div>

              <label className="block text-lg font-semibold text-gray-700 mb-2">
                Select Type
              </label>

              <select
                value={subCategory}
                onChange={
                  handleSubCategoryChange
                }
                className="w-full p-4 border-2 border-gray-300 rounded-2xl outline-none"
              >

                {Object.keys(
                  QUESTION_BANK[category]
                ).map((item, index) => (

                  <option
                    key={index}
                    value={item}
                  >
                    {item}
                  </option>

                ))}

              </select>

            </div>

          </div>

          {/* QUESTION */}

          <h3 className="text-2xl font-semibold text-gray-800 mb-4">
            Question:
          </h3>

          <div className="bg-indigo-50 p-6 rounded-2xl border-l-4 border-indigo-600 mb-6">

            <p className="text-lg">
              {question}
            </p>

          </div>

          {/* ANSWER */}

          <textarea
            value={answer}
            onChange={(e) =>
              setAnswer(e.target.value)
            }
            placeholder="Type your answer..."
            className="w-full h-48 p-5 border-2 border-gray-300 rounded-2xl outline-none text-lg resize-none mb-4"
          />

          {/* SUBMIT */}

          <button
            onClick={handleSubmit}
            disabled={loading}
            className={`w-full py-4 rounded-2xl text-white font-bold text-xl transition-all duration-300 ${
              loading
                ? "bg-gray-500 cursor-not-allowed"
                : "bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-2xl"
            }`}
          >

            {loading
              ? "AI Analyzing..."
              : "Submit & Get AI Feedback"}

          </button>

          

         {/* FEEDBACK */}

{feedback && (

<div className="mt-8 space-y-6">

  {/* SCORE */}

  <div className="bg-indigo-50 p-6 rounded-2xl shadow-lg border border-indigo-200">

    <h2 className="text-2xl font-bold text-indigo-700 mb-3">
      Score
    </h2>

    <p className="text-4xl font-bold text-indigo-900">
      {feedback.score}
    </p>

  </div>

  {/* STRENGTHS */}

  <div className="bg-green-50 p-6 rounded-2xl shadow-lg border border-green-200">

    <h2 className="text-2xl font-bold text-green-700 mb-4">
      Strengths
    </h2>

    <ul className="list-disc ml-6 space-y-2 text-gray-700">

      {feedback.strengths?.map(
        (item, index) => (

          <li key={index}>
            {item}
          </li>

        )
      )}

    </ul>

  </div>

  {/* WEAKNESSES */}

  <div className="bg-red-50 p-6 rounded-2xl shadow-lg border border-red-200">

    <h2 className="text-2xl font-bold text-red-700 mb-4">
      Weaknesses
    </h2>

    <ul className="list-disc ml-6 space-y-2 text-gray-700">

      {feedback.weaknesses?.map(
        (item, index) => (

          <li key={index}>
            {item}
          </li>

        )
      )}

    </ul>

  </div>

  {/* IMPROVEMENT PLAN */}

  <div className="bg-yellow-50 p-6 rounded-2xl shadow-lg border border-yellow-200">

    <h2 className="text-2xl font-bold text-yellow-700 mb-4">
      Improvement Plan
    </h2>

    <ul className="list-disc ml-6 space-y-2 text-gray-700">

      {feedback.improvementPlan?.map(
        (item, index) => (

          <li key={index}>
            {item}
          </li>

        )
      )}

    </ul>

  </div>

  {/* SUGGESTED ANSWER */}

  <div className="bg-blue-50 p-6 rounded-2xl shadow-lg border border-blue-200">

    <h2 className="text-2xl font-bold text-blue-700 mb-4">
      Suggested Answer
    </h2>

    <p className="text-gray-700 leading-8">
      {feedback.suggestedAnswer}
    </p>

  </div>

  {/* CAREER TIP */}

  <div className="bg-purple-50 p-6 rounded-2xl shadow-lg border border-purple-200">

    <h2 className="text-2xl font-bold text-purple-700 mb-4">
      Career Tip
    </h2>

    <p className="text-gray-700 leading-8">
      {feedback.careerTip}
    </p>

  </div>

</div>

)}

        </div>

        {/* NEXT QUESTION */}

        <button
          onClick={generateNextQuestion}
          className="mt-6 w-full py-4 bg-blue-600 text-white rounded-2xl text-xl font-bold hover:bg-blue-700 transition-all duration-300"
        >

          Next Question

        </button>

        {/* COMPLETE INTERVIEW */}

        <button
          onClick={handleCompleteInterview}
          className="mt-4 w-full py-4 bg-green-600 text-white rounded-2xl text-xl font-bold hover:bg-green-700 transition-all duration-300"
        >

          Complete Mock Interview

        </button>

        {/* COMPLETED MESSAGE */}

        {completed && (

          <div className="mt-6 bg-green-100 border-l-4 border-green-600 p-6 rounded-2xl">

            <h2 className="text-2xl font-bold text-green-800 mb-2">
              Mock Interview Completed 
            </h2>

            <p className="text-lg text-gray-700">
              You successfully completed your AI mock interview.
            </p>

          </div>
        )}

      </div>

    </div>
  );
}