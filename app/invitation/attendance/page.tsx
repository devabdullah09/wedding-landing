"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const guests = [
  { name: 'GREG SMITH' },
  { name: 'ANETA STING' },
  { name: 'MARRY JANE' },
  { name: 'TEO STING' },
];

export default function AttendancePage() {
  const [attendance, setAttendance] = useState([
    'will', 'will', 'will', 'will',
  ]);
  const router = useRouter();

  const handleSelect = (idx: number, value: 'will' | 'cant') => {
    setAttendance(prev => prev.map((v, i) => (i === idx ? value : v)));
  };

  const handleContinue = () => {
    router.push('/invitation/after-party');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fff]" style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' }}>
      {/* Main Content Centered */}
      <div className="flex flex-col items-center justify-center flex-1 py-12">
        <div className="relative w-full max-w-[1000px] bg-white rounded-2xl border border-[#B7B7B7] p-0 shadow-md mx-auto z-10" style={{ minHeight: 700 }}>
          {/* Decorative Corners and Sparkles (inside card) */}
          <Image src="/images/invitation/leaf_left.png" alt="leaf left" width={180} height={180} className="absolute left-0 top-0 z-0" style={{ pointerEvents: 'none' }} />
          <Image src="/images/invitation/sparkle_left.png" alt="sparkle left" width={180} height={40} className="absolute left-5 top-0 z-0" style={{ pointerEvents: 'none' }} />
          <Image src="/images/invitation/leaf_right.png" alt="leaf right" width={180} height={180} className="absolute right-0 bottom-0 z-0" style={{ pointerEvents: 'none' }} />
          <Image src="/images/invitation/sparkle_right.png" alt="sparkle right" width={200} height={40} className="absolute right-5 bottom-10 z-0" style={{ pointerEvents: 'none' }} />

          {/* Main Content */}
          <div className="w-full max-w-[700px] mx-auto flex flex-col items-center mb-8 mt-2 z-10 px-16 pt-12 pb-8">
            <div className="text-center w-full">
              <div className="text-4xl md:text-5xl sail-font" style={{ fontWeight: 500, color: '#08080A', letterSpacing: '0.5px', lineHeight: 1.1, fontFamily: 'Sail, cursive' }}>
                Wedding Day
              </div>
              {/* Horizontal Divider */}
              <div className="w-24 h-[2px] bg-[#B7B7B7] mx-auto my-4" />
              <div className="text-base md:text-lg mb-12 tracking-normal" style={{ color: '#08080A', fontWeight: 400, fontFamily: 'Montserrat', letterSpacing: '0.01em' }}>
                Sunday, May 24, 2026
              </div>
            
            
            </div>

            {/* Guest List Grid */}
            <div className="w-full grid grid-cols-3 gap-x-6 gap-y-6 mb-12 mt-2">
             
              {guests.map((guest, idx) => (
                <React.Fragment key={guest.name}>
                  <div className="flex items-center justify-end pr-2">
                    <span className="font-semibold text-sm md:text-base text-[#08080A] uppercase" style={{ fontFamily: 'Montserrat', minWidth: 140, letterSpacing: '0.5px' }}>{guest.name}</span>
                  </div>
                  <button
                    className={`w-full py-3 rounded-md text-base transition-colors focus:outline-none ${attendance[idx] === 'will' ? 'bg-[#08080A] text-white' : 'bg-[#F5F5F5] text-[#08080A]'}`}
                    style={{ fontFamily: 'Montserrat' }}
                    onClick={() => handleSelect(idx, 'will')}
                  >
                    Will Attend
                  </button>
                  <button
                    className={`w-full py-3 rounded-md text-base transition-colors focus:outline-none ${attendance[idx] === 'cant' ? 'bg-[#08080A] text-white' : 'bg-[#F5F5F5] text-[#08080A]'}`}
                    style={{ fontFamily: 'Montserrat' }}
                    onClick={() => handleSelect(idx, 'cant')}
                  >
                    Can't Attend
                  </button>
                </React.Fragment>
              ))}
            </div>

            {/* Continue Button */}
            <button
              className="w-full max-w-md bg-[#08080A] text-white py-5 rounded-md font-semibold text-lg mt-8 hover:bg-[#222] transition-colors focus:outline-none"
              style={{ fontFamily: 'Montserrat' }}
              onClick={handleContinue}
            >
              Continue
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="w-full bg-[#181818] py-6 px-8 flex items-center justify-between text-white text-xs mt-12" style={{ fontFamily: 'Montserrat', fontWeight: 400 }}>
        <div>
          © 2025 Anna Kowalska & Piotr Nowak<br />Powered by Vesello
        </div>
        <button className="border border-white rounded px-4 py-1 text-xs" style={{ background: 'none' }}>LOGIN</button>
      </footer>
    </div>
  );
} 