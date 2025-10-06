import React, { useState } from "react";
import "./sidebar.css";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import 'bootstrap/dist/css/bootstrap.min.css';
import { FormControl } from 'react-bootstrap';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("Home");
  const [searchTerm, setSearchTerm] = useState("");

  const toggleSidebar = () => setIsOpen(!isOpen);

  const componentMap = {
    Home: <Home />,
    About: <About />,
    Contact: <Contact />,
  };

  const filteredSections = Object.keys(componentMap).filter(section =>
    section.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContent = () => {
    return componentMap[activeSection] || <Home />;
  };

  return (
    <div className="container">
      <button className="menu-btn" onClick={toggleSidebar}>☰</button>

      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <FormControl
          type="search"
          placeholder="Search Section"
          className="searchbar"
          aria-label="Search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {filteredSections.map(section => (
          <button
            key={section}
            onClick={() => setActiveSection(section)}
            className={activeSection === section ? "active" : ""}
          >
            {section}
          </button>
        ))}
      </div>

      <div className="main-content">
        <div className="header">
          <h1>Welcome to My Website</h1>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Sidebar;