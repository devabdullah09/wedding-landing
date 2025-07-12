"use client";
import React from 'react';
import Image from 'next/image';

export default function ConfirmationPage() {
  return (
    <div className="min-h-screen flex flex-col justify-between bg-[#fff]" style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' }}>
      <div className="flex flex-col items-center justify-center flex-1 py-12">
        <div className="relative w-full max-w-[700px] bg-white rounded-2xl border border-[#B7B7B7] p-0 shadow-md mx-auto z-10" style={{ minHeight: 400 }}>
          {/* Decorative Corners and Sparkles (inside card) */}
          <Image src="/images/invitation/leaf_left.png" alt="leaf left" width={180} height={180} className="absolute left-0 top-0 z-0" style={{ pointerEvents: 'none' }} />
          <Image src="/images/invitation/sparkle_left.png" alt="sparkle left" width={180} height={40} className="absolute left-5 top-0 z-0" style={{ pointerEvents: 'none' }} />
          <Image src="/images/invitation/leaf_right.png" alt="leaf right" width={180} height={180} className="absolute right-0 bottom-0 z-0" style={{ pointerEvents: 'none' }} />
          <Image src="/images/invitation/sparkle_right.png" alt="sparkle right" width={200} height={40} className="absolute right-5 bottom-10 z-0" style={{ pointerEvents: 'none' }} />

          {/* Main Content */}
          <div className="w-full max-w-[600px] mx-auto flex flex-col items-center mb-8 mt-2 z-10 px-12 pt-16 pb-16">
            <div className="text-center w-full mb-4">
              <span className="text-4xl md:text-5xl" style={{ fontFamily: 'Sail, cursive', fontWeight: 400, color: '#E5B574', letterSpacing: '0.5px', lineHeight: 1.1 }}>Thank You!</span>
              <div className="w-24 h-[2px] bg-[#B7B7B7] mx-auto my-6" />
              <div className="text-lg md:text-xl mt-2 mb-2 tracking-normal" style={{ color: '#08080A', fontWeight: 500, fontFamily: 'Montserrat', letterSpacing: '0.01em' }}>
                Your response has been received.<br />We look forward to celebrating with you!
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 