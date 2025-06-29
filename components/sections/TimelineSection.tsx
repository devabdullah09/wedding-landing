import React from 'react';
import CollapsibleSection from '../CollapsibleSection';

export default function WeddingTimeline() {
  const events = [
    { time: '11:00 AM', icon: '/images/toast.png', label: 'WELCOME TOAST' },
    { time: '12:00 AM', icon: '/images/ceremony.png', label: 'CEREMONY' },
    { time: '01:00 PM', icon: '/images/lunch.png', label: 'WEDDING LUNCH' },
    { time: '03:00 PM', icon: '/images/cake.png', label: 'CAKE CUTTING' },
    { time: '04:00 PM', icon: '/images/dance.png', label: 'FIRST DANCE' },
    { time: '05:00 PM', icon: '/images/cocktail.png', label: 'COCKTAIL HOUR' },
    { time: '08:00 PM', icon: '/images/dinner.png', label: 'BUFFET DINNER' },
    { time: '11:30 PM', icon: '/images/fireworks.png', label: 'FIREWORKS' },
  ];

  return (
    <CollapsibleSection title="Wedding Day Timeline">
      {/* Elegant gold line at top */}
      <div className="flex justify-center" style={{ marginTop: '-8px', marginBottom: '8px' }}>
        <img
          src="/images/Elegent line-01 1.png"
          alt="Divider"
          style={{maxWidth: '1500px', minHeight: '54px', maxHeight: '90px' }}
        />
      </div>
      {/* Header inside card */}
      <div className="flex flex-col items-center justify-center mb-2 relative z-9" style={{ marginTop: '-8px', marginBottom: '8px' }}>
        <span
          style={{
            fontFamily: 'Sail',
            fontWeight: 500,
            fontSize: '48px',
            background: 'linear-gradient(90deg, #E5B574 0%, #D59C58 43%, #C18037 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            letterSpacing: '1px',
            marginTop: '-8px',
            marginBottom: '0',
          }}
        >
          Wedding Day
        </span>
      </div>
      {/* Timeline Content */}
      <div className="flex flex-col justify-center items-center">
        <div className="relative w-full flex flex-col justify-center items-center overflow-visible" style={{ minHeight: '600px', maxWidth: '500px' }}>
          {/* Timeline vertical line (absolute, spans all events) */}
          <div className="absolute" style={{ left: '50%', top: 0, bottom: 0, width: '3px', background: '#E5B574', transform: 'translateX(-50%)', borderRadius: '2px', zIndex: 1 }} />
          {/* Timeline events */}
          {events.map((event, idx, arr) => (
            <div key={event.time} className="flex flex-row items-center w-full relative" style={{ minHeight: '70px', marginBottom: idx !== arr.length - 1 ? '20px' : 0 }}>
              {/* Left side - Time */}
              <div className="flex justify-end items-center" style={{ flex: '1', paddingRight: '30px' }}>
                <span style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '20px', color: '#08080A', letterSpacing: '0.01em', whiteSpace: 'nowrap', lineHeight: 1, textAlign: 'right' }}>{event.time}</span>
              </div>
              {/* Center - Dot and horizontal line */}
              <div className="flex items-center justify-center relative" style={{ width: '80px', zIndex: 2 }}>
                {/* Dot */}
                <div style={{ 
                  width: '16px', 
                  height: '16px', 
                  background: '#E5B574', 
                  border: '2px solid #C18037', 
                  borderRadius: '50%', 
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 3,
                  boxShadow: '0 0 0 2px #fff'
                }} />
                {/* Horizontal line */}
                <div style={{ 
                  width: '60px', 
                  height: '2px', 
                  background: '#E5B574', 
                  position: 'absolute',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  zIndex: 1
                }} />
              </div>
              {/* Right side - Icon and label */}
              <div className="flex flex-row items-center" style={{ flex: '1', paddingLeft: '30px' }}>
                <img src={event.icon} alt={event.label} style={{ width: '70px', height: '70px', objectFit: 'contain', marginRight: '12px', flexShrink: 0 }} />
                <span style={{ 
                  fontFamily: 'Montserrat', 
                  fontWeight: 600, 
                  fontSize: '16px', 
                  color: '#08080A', 
                  letterSpacing: '0.01em', 
                  lineHeight: 1.2,
                  textAlign: 'left'
                }}>{event.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Gold leaves at bottom corners, inside the border and not overlapping */}
      <img
        src="/images/Vector (2).png"
        className="absolute z-10 pointer-events-none"
        alt="Decoration left"
        style={{ width: '350px', height: '450px', bottom: '1px', left: '1px' }}
      />
      <img
        src="/images/Vector.png"
        className="absolute z-10 pointer-events-none"
        alt="Decoration right"
        style={{ width: '280px', height: '350px', bottom: '1px', right: '1px' }}
      />
    </CollapsibleSection>
  );
}