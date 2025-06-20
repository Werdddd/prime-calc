import React, { useState, useRef, useEffect } from 'react';
import './Navbar.css'; 

// SVG icons for light/dark mode toggle and social links
const SunIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/></svg>
);
const MoonIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z"/></svg>
);

const LinkedInIcon = (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm15.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595zm0 0"/></svg>
);
const GitHubIcon = (
  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.387.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.084-.729.084-.729 1.205.084 1.84 1.236 1.84 1.236 1.07 1.834 2.809 1.304 3.495.997.108-.775.418-1.305.762-1.605-2.665-.305-5.466-1.334-5.466-5.931 0-1.31.469-2.381 1.236-3.221-.124-.303-.535-1.523.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.553 3.297-1.23 3.297-1.23.653 1.653.242 2.873.119 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.803 5.624-5.475 5.921.43.372.823 1.102.823 2.222 0 1.606-.014 2.898-.014 3.293 0 .322.216.694.825.576 4.765-1.588 8.199-6.084 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
);

// Navbar component accepting props: mode (light/dark) and toggleMode function
const Navbar = ({ mode, toggleMode }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close the dropdown if a click occurs outside of it
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownOpen]);

  // Automatically close mobile menu when window is resized to desktop width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setMobileMenuOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Toggle dropdown menu when "Links" is clicked
  const handleNavClick = (e) => {
    e.preventDefault();
    setDropdownOpen((open) => !open);
  };

  const handleDropdownLinkClick = () => {
    setDropdownOpen(false);
  };

  // Toggle mobile menu and ensure dropdown closes
  const handleHamburgerClick = () => {
    setMobileMenuOpen((open) => !open);
    setDropdownOpen(false);
  };

  return (
    <nav className="navbar glass-navbar">
      <div className="logo">NumWais</div>

      {/* Navigation section aligned to the right */}
      <div style={{ display: 'flex', alignItems: 'center', marginLeft: 'auto', position: 'relative' }}>
        <ul className={`nav-links${mobileMenuOpen ? ' open' : ''}`}>
          <li><a href="/" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
          <li><a href="https://drive.google.com/file/d/1lWTgp-Ekn0EpgoQM1u-AkIzT-rU-WSgS/view?usp=drive_link" onClick={() => setMobileMenuOpen(false)}>Resume</a></li>
          <li><a href="#links" onClick={(e) => { handleNavClick(e); setMobileMenuOpen(false); }}>Links</a></li>
        </ul>

        {/* Dropdown menu for Links */}
        {dropdownOpen && (
          <div ref={dropdownRef} className="dropdown-menu">
            <a href="https://www.linkedin.com/in/andrew-emmanuel-robles-952875237/" target="_blank" rel="noopener noreferrer" onClick={handleDropdownLinkClick} className="dropdown-link">
              {LinkedInIcon} <span style={{ marginLeft: 8 }}>LinkedIn</span>
            </a>
            <a href="https://github.com/Werdddd" target="_blank" rel="noopener noreferrer" onClick={handleDropdownLinkClick} className="dropdown-link">
              {GitHubIcon} <span style={{ marginLeft: 8 }}>GitHub</span>
            </a>
          </div>
        )}

        {/* Button to toggle between light and dark mode */}
        <button
          onClick={toggleMode}
          aria-label="Toggle light/dark mode"
          style={{
            marginRight: '0.5rem',
            fontSize: '1.5rem',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--gold-dark)',
            display: 'flex',
            alignItems: 'center',
            padding: 0
          }}
        >
          {mode === 'dark' ? MoonIcon : SunIcon}
        </button>

        {/* Hamburger menu button (visible on small screens) */}
        <div
          className="hamburger"
          onClick={handleHamburgerClick}
          aria-label="Toggle menu"
          tabIndex={0}
          role="button"
        >

          {/* Three bars of the hamburger icon, color changes by theme */}
          <span className="bar" style={{ background: mode === 'dark' ? '#fff' : 'var(--gold-dark)' }}></span>
          <span className="bar" style={{ background: mode === 'dark' ? '#fff' : 'var(--gold-dark)' }}></span>
          <span className="bar" style={{ background: mode === 'dark' ? '#fff' : 'var(--gold-dark)' }}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
