import React from 'react';
import { FaLinkedin, FaGithub, FaReact } from 'react-icons/fa';
import { SiTailwindcss } from 'react-icons/si';
import './Footer.css';

// Functional component for Footer
const Footer = () => (
  <footer className="footer">
    {/* Main container: full width, horizontal layout, spaced items */}
    <div className="w-full flex items-center justify-between px-4">
      {/* Left: Social Icons */}
      <div className="flex items-center gap-4">
        <a href="https://www.linkedin.com/in/andrew-emmanuel-robles-952875237/" target="_blank" rel="noopener noreferrer" className="dropdown-link" style={{ padding: 0 }}>
          <FaLinkedin size={22} />
        </a>
        <a href="https://github.com/Werdddd" target="_blank" rel="noopener noreferrer" className="dropdown-link" style={{ padding: 0 }}>
          <FaGithub size={22} />
        </a>
      </div>

      {/* Center Section: Your name or brand */}
      <div className="text-center flex-1">
        <span className="font-semibold text-sm">&copy;  Andrew Emmanuel Robles</span>
      </div>

      {/* Right Section: Tech stack used to build the site */}
      <div className="flex items-center gap-2">
        <span className="text-sm">Made using:</span>
        <FaReact size={20} className="text-cyan-500" title="React" />
        <SiTailwindcss size={20} className="text-sky-400" title="Tailwind CSS" />
      </div>
    </div>
  </footer>
);

export default Footer; 

