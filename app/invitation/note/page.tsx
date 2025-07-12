"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const guests = [
  { name: 'GREG SMITH' },
  { name: 'ANETA STING' },
];

export default function NotePage() {
  const [notes, setNotes] = useState(['', '']);
  const router = useRouter();

  const handleNoteChange = (idx: number, value: string) => {
    setNotes(prev => prev.map((v, i) => (i === idx ? value : v)));
  };

  const handleContinue = () => {
    // Next step placeholder
    router.push('/invitation/confirmation');
  };
  const handleSkip = () => {
    router.push('/invitation/confirmation');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fff]" style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' }}>
      <div className="flex flex-col items-center justify-center flex-1 py-12">
        <div className="relative w-full max-w-[1000px] bg-white rounded-2xl border border-[#B7B7B7] p-0 shadow-md mx-auto z-10" style={{ minHeight: 700 }}>
          {/* Decorative Corners and Sparkles (inside card) */}
          <Image src="/images/invitation/leaf_left.png" alt="leaf left" width={180} height={180} className="absolute left-0 top-0 z-0" style={{ pointerEvents: 'none' }} />
          <Image src="/images/invitation/sparkle_left.png" alt="sparkle left" width={180} height={40} className="absolute left-5 top-0 z-0" style={{ pointerEvents: 'none' }} />
          <Image src="/images/invitation/leaf_right.png" alt="leaf right" width={180} height={180} className="absolute right-0 bottom-0 z-0" style={{ pointerEvents: 'none' }} />
          <Image src="/images/invitation/sparkle_right.png" alt="sparkle right" width={200} height={40} className="absolute right-5 bottom-10 z-0" style={{ pointerEvents: 'none' }} />

          {/* Main Content */}
          <div className="w-full max-w-[900px] mx-auto flex flex-col items-center mb-8 mt-2 z-10 px-16 pt-12 pb-8">
            <div className="text-center w-full mb-6">
              <div className="flex flex-col items-center">
                <span className="text-4xl md:text-5xl" style={{ fontFamily: 'Sail, cursive', fontWeight: 400, color: '#E5B574', letterSpacing: '0.5px', lineHeight: 1.1 }}>Send A Note</span>
                <span className="text-3xl md:text-4xl" style={{ fontFamily: 'Sail, cursive', fontWeight: 400, color: '#08080A', letterSpacing: '0.5px', lineHeight: 1.1, fontStyle: 'italic', marginTop: '.5rem' }}>To The Couple</span>
                <div className="w-24 h-[2px] bg-[#B7B7B7] mx-auto my-4" />
              </div>
              <div className="text-base md:text-lg mt-2 mb-8 tracking-normal" style={{ color: '#08080A', fontWeight: 400, fontFamily: 'Montserrat', letterSpacing: '0.01em' }}>
                Aneta Sting:
              </div>
            </div>
            {/* Guest Notes */}
            <div className="w-full max-w-[900px] mx-auto grid grid-cols-2 gap-x-6 gap-y-6 mb-12 mt-2">
              {guests.map((guest, idx) => (
                <div key={guest.name} className="flex flex-col items-center w-full">
                  <div className="text-sm md:text-base text-[#08080A] uppercase mb-2 text-left w-full" style={{ fontFamily: 'Montserrat', letterSpacing: '0.5px' }}>{guest.name}</div>
                  <textarea
                    className="w-full h-32 rounded-md border border-[#B7B7B7] bg-[#F5F5F5] p-4 text-base focus:outline-none focus:border-[#E5B574] resize-none"
                    style={{ fontFamily: 'Montserrat', fontSize: '15px' }}
                    value={notes[idx]}
                    onChange={e => handleNoteChange(idx, e.target.value)}
                  />
                </div>
              ))}
            </div>
            {/* Continue & Skip Buttons */}
            <div className="w-full flex flex-col gap-4 justify-center mt-4 max-w-md mx-auto">
              <button
                className="w-full bg-[#08080A] text-white py-5 rounded-md text-lg hover:bg-[#222] transition-colors focus:outline-none"
                style={{ fontFamily: 'Montserrat' }}
                onClick={handleContinue}
              >
                Continue
              </button>
              <button
                className="w-full bg-[#08080A] text-white py-5 rounded-md text-lg hover:bg-[#222] transition-colors focus:outline-none"
                style={{ fontFamily: 'Montserrat' }}
                onClick={handleSkip}
              >
                Skip
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 