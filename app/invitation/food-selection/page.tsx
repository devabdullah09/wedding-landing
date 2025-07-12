"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

const guests = [
  { name: 'GREG SMITH' },
  { name: 'ANETA STING' },
];
const options = ['Regular', 'Vegetarian', 'Vegan'];

export default function FoodSelectionPage() {
  const [selections, setSelections] = useState(['Regular', 'Regular']);
  const router = useRouter();

  const handleSelect = (guestIdx: number, option: string) => {
    setSelections(prev => prev.map((v, i) => (i === guestIdx ? option : v)));
  };

  const handleContinue = () => {
    router.push('/invitation/accommodation');
  };

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fff]" style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' }}>
      <div className="flex flex-col items-center justify-center flex-1 py-12">
        <div className="relative w-full max-w-[900px] bg-white rounded-2xl border border-[#B7B7B7] p-0 shadow-md mx-auto z-10" style={{ minHeight: 700 }}>
          {/* Decorative Corners and Sparkles (inside card) */}
          <Image src="/images/invitation/leaf_left.png" alt="leaf left" width={180} height={180} className="absolute left-0 top-0 z-0" style={{ pointerEvents: 'none' }} />
          <Image src="/images/invitation/sparkle_left.png" alt="sparkle left" width={180} height={40} className="absolute left-5 top-0 z-0" style={{ pointerEvents: 'none' }} />
          <Image src="/images/invitation/leaf_right.png" alt="leaf right" width={180} height={180} className="absolute right-0 bottom-0 z-0" style={{ pointerEvents: 'none' }} />
          <Image src="/images/invitation/sparkle_right.png" alt="sparkle right" width={200} height={40} className="absolute right-5 bottom-10 z-0" style={{ pointerEvents: 'none' }} />

          {/* Main Content */}
          <div className="w-full max-w-[1200px] mx-auto flex flex-col items-center mb-8 mt-2 z-10 px-16 pt-12 pb-8">
            <div className="text-center w-full mb-10">
              <div className="flex flex-col items-center">
                <span className="text-3xl md:text-4xl" style={{ fontFamily: 'Sail, cursive', fontWeight: 400, color: '#E5B574', letterSpacing: '0.5px', lineHeight: 1.1 }}>What's Your</span>
                <span className="text-4xl md:text-5xl" style={{ fontFamily: 'Sail, cursive', fontWeight: 400, color: '#08080A', letterSpacing: '0.5px', lineHeight: 1.1, marginTop: '0.5rem' }}>Meal Preference?</span>
                <div className="w-24 h-[2px] bg-[#B7B7B7] mx-auto my-4" />
              </div>
            </div>
            {/* Guest Meal Selection */}
            <div className="w-full max-w-[1200px] mx-auto grid grid-cols-2 gap-x-4 gap-y-8 mb-12">
              {/* Left guest: left aligned */}
              <div className="flex flex-col w-full items-start">
                <div className="text-sm md:text-base text-[#08080A] uppercase mb-2" style={{ fontFamily: 'Montserrat', letterSpacing: '0.5px' }}>{guests[0].name}</div>
                <div className="flex flex-col gap-4 w-full">
                  {options.map(option => (
                    <button
                      key={option}
                      className={`w-full py-3 rounded-md text-base transition-colors focus:outline-none text-left pl-6 ${selections[0] === option ? 'bg-[#08080A] text-white' : 'bg-[#F5F5F5] text-[#08080A]'}`}
                      style={{ fontFamily: 'Montserrat', fontSize: '15px' }}
                      onClick={() => handleSelect(0, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
              {/* Right guest: right aligned */}
              <div className="flex flex-col w-full items-end">
                <div className="text-sm md:text-base text-[#08080A] uppercase mb-2 text-right" style={{ fontFamily: 'Montserrat', letterSpacing: '0.5px' }}>{guests[1].name}</div>
                <div className="flex flex-col gap-4 w-full">
                  {options.map(option => (
                    <button
                      key={option}
                      className={`w-full py-3 rounded-md text-base transition-colors focus:outline-none text-right pr-6 ${selections[1] === option ? 'bg-[#08080A] text-white' : 'bg-[#F5F5F5] text-[#08080A]'}`}
                      style={{ fontFamily: 'Montserrat', fontSize: '15px' }}
                      onClick={() => handleSelect(1, option)}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
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
    </div>
  );
} 