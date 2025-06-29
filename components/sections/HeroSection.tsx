import { useState, useEffect } from 'react';

export default function HeroSection() {
  const [timeLeft, setTimeLeft] = useState({
    days: 2,
    hours: 11,
    minutes: 1,
    seconds: 2,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <>
      {/* Google Fonts */}
      <link href="https://fonts.googleapis.com/css2?family=Sail&family=Montserrat:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      
      <div className="relative w-full overflow-hidden bg-white">
        <div className="flex flex-col md:flex-row h-full min-h-[420px] md:min-h-[420px]">
          {/* Left side content */}
          <div className="flex-1 flex flex-col justify-center items-center px-8 md:px-16 py-8 md:py-8 z-20">
            {/* Names in elegant box */}
            <div className="border border-black px-8 py-3 mb-6 inline-block" style={{ fontFamily: 'Sail', fontSize: '2.2rem', letterSpacing: '0.02em' }}>
              Lucas & Mia
            </div>
            
            {/* Save The Date */}
            <div className="mb-2">
              <h2
                className="text-[2.2rem] md:text-[2.7rem] font-normal mb-1"
                style={{
                  fontFamily: 'Sail',
                  background: 'linear-gradient(90deg, #E5B574 0%, #C18037 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  display: 'inline-block',
                  letterSpacing: '1px',
                  lineHeight: 1.1,
                }}
              >
                Save The Date
              </h2>
            </div>

            {/* Countdown Timer */}
            <div className="mb-8">
              <p className="text-black text-base md:text-lg font-semibold tracking-[0.12em]" style={{ fontFamily: 'Montserrat', letterSpacing: '0.12em' }}>
                WE'RE GETTING MARRIED!
              </p>
            </div>

            <div className="flex gap-4 mb-2">
              {[
                { value: timeLeft.days, label: 'DAYS' },
                { value: timeLeft.hours, label: 'HOURS' },
                { value: timeLeft.minutes, label: 'MINUTES' },
                { value: timeLeft.seconds, label: 'SECONDS' },
              ].map((item, idx) => (
                <div key={item.label} className="text-center">
                  <div
                    className="text-2xl md:text-3xl font-bold py-3 px-5 rounded mb-2"
                    style={{
                      background: 'linear-gradient(90deg, #E5B574 0%, #C18037 100%)',
                      color: 'white',
                      minWidth: '64px',
                      fontFamily: 'Montserrat',
                    }}
                  >
                    {String(item.value).padStart(2, '0')}
                  </div>
                  <div className="text-xs md:text-sm text-black font-semibold tracking-wide" style={{ fontFamily: 'Montserrat' }}>{item.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right side image */}
          <div className="flex-2 flex items-center justify-center">
            <img
              src="/images/herosection.png"
              alt="Wedding couple"
              className="w-full h-full object-cover object-center max-h-[420px]"
              style={{ maxWidth: '100%' }}
            />
          </div>
        </div>
      </div>
    </>
  );
}