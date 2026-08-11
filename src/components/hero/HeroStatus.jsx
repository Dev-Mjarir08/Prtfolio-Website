import React from 'react';

export default function HeroStatus({ data, setCursor }) {
  return (
    <div className="hero-status-bar">
      <div 
        className="hero-status__tag"
        onMouseEnter={() => setCursor('hover', 'JARIR')}
        onMouseLeave={() => setCursor('default')}
      >
        <span className="hero-status__num">JARIR / 01</span>
      </div>

      <div className="hero-status__title">
        <span>FULL STACK MERN DEVELOPER</span>
      </div>

      <div 
        className="hero-status__badge"
        onMouseEnter={() => setCursor('hover', 'STATUS')}
        onMouseLeave={() => setCursor('default')}
      >
        <span className="hero-status__pulse" />
        <span className="hero-status__text">AVAILABLE FOR WORK</span>
      </div>
    </div>
  );
}
