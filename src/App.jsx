import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login"
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import MockInterview from "./components/MockInterview";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import ResumeAnalyzer from "./components/ResumeAnalyzer";

function App() {
  return (
     <BrowserRouter basename="/Placementor-FrontEnd">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/interview" element={<MockInterview />} />
        <Route path="/resume" element={<ResumeAnalyzer />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;