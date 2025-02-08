import React from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import "./Styles/App.css";

import Home from "./Components/Home";
import Navbar from "./Components/Navbar";
import ExternalResources from "./Components/External";
import OllamaChat from "./Components/OllamaChat";

const MeetTheTeam = () => <div>Meet the Team Page</div>;
const About = () => <div>About Us Page</div>;

// Layout component to conditionally render Navbar
function Layout() {
  const location = useLocation(); // Get current route
  const hideNavbarOnPages = ["/chat"]; // Pages where Navbar should be hidden

  return (
    <>
      {!hideNavbarOnPages.includes(location.pathname) && <Navbar />} {/* Conditionally hide Navbar */}
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/external-resources" element={<ExternalResources />} />
          <Route path="/meet-the-team" element={<MeetTheTeam />} />
          <Route path="/about" element={<About />} />
          <Route path="/chat" element={<OllamaChat />} /> {/* Chat page without Navbar */}
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout />
    </Router>
  );
}

export default App;
