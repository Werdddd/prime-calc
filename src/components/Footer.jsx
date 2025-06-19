import React from 'react';
import './Footer.css';

const Footer = () => (
  <footer className="footer">
    <span>&copy; {new Date().getFullYear()} Andrew Emmanuel Robles &mdash;  <a href="https://github.com/Werdddd" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--gold-dark)', textDecoration: 'underline' }}>GitHub</a></span>
  </footer>
);

export default Footer; 

