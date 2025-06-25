import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <h1 className="logo">🎬 CineReact</h1>
      <nav className="nav">
        <a href="#" className="nav-link">Início</a>
        <a href="#" className="nav-link">Favoritos</a>
        <a href="#" className="nav-link">Contato</a>
      </nav>
    </header>
  );
};

export default Header;
