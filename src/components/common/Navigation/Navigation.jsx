import React, { useState } from 'react';
import SvgBorder from './SvgBorder';
import './Navigation.css';

const Navigation = ({ links }) => {
  const [active, setActive] = useState(null);

  return (
    
    <nav className="nav">
      {links.map(({ url, label }, index) => (
        <a
          key={index}
          href={url}
          className={`nav-item ${active === index ? 'is-active' : ''}`}
          onClick={(e) => {
            e.preventDefault();
            setActive(index);
          }}
        >
          <SvgBorder />
          <SvgBorder />
          {label}
        </a>
      ))}
    </nav>
  );
};

export default Navigation;
