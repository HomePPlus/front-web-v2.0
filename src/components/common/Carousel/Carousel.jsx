import React, { useState } from 'react';
import { TiChevronLeftOutline, TiChevronRightOutline } from 'react-icons/ti';
import './Carousel.css';

const Card = ({ imageUrl, title }) => (
  <div className='card'>
    <h2>{title}</h2>
    <div className='card-image-container'>
      <img src={imageUrl} alt={title} className='card-image' />
    </div>
  </div>
);

const Carousel = ({ children }) => {
  const [active, setActive] = useState(2);
  const count = React.Children.count(children);
  
  return (
    <div className='carousel'>
      {active > 0 && (
        <button className='carousel-nav left' onClick={() => setActive(i => i - 1)}>
          <TiChevronLeftOutline/>
        </button>
      )}
      {React.Children.map(children, (child, i) => (
        <div 
          className='card-container' 
          style={{
            '--active': i === active ? 1 : 0,
            '--offset': (active - i) / 3,
            '--direction': Math.sign(active - i),
            '--abs-offset': Math.abs(active - i) / 3,
            pointerEvents: active === i ? 'auto' : 'none',
            opacity: Math.abs(active - i) >= 3 ? '0' : '1',
            display: Math.abs(active - i) > 3 ? 'none' : 'block',
          }}
        >
          {child}
        </div>
      ))}
      {active < count - 1 && (
        <button className='carousel-nav right' onClick={() => setActive(i => i + 1)}>
          <TiChevronRightOutline/>
        </button>
      )}
    </div>
  );
};

export { Card, Carousel };
