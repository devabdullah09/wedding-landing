'use client';

import { useState } from 'react';
import Image from 'next/image';
import CollapsibleSection from '../CollapsibleSection';

export default function WishesAndGiftsSection() {
  return (
    <CollapsibleSection title="Wishes And Gifts">
      {/* Header */}
      <div className="text-center mb-10 mt-2">
        <span
          className="block text-[54px] md:text-[64px] font-normal mb-2"
          style={{
            fontFamily: 'Sail',
            background: 'linear-gradient(90deg, #E5B574 0%, #C18037 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
            letterSpacing: '2px',
            lineHeight: 1.1,
          }}
        >
          Wishes And Gifts
        </span>
      </div>
      {/* Two Columns */}
      <div className="flex flex-col md:flex-row justify-center items-start gap-10 md:gap-0 mb-16 w-full max-w-4xl mx-auto">
        {/* Left Column */}
        <div className="flex-1 text-center md:text-right pr-0 md:pr-8">
          <div className="text-xl font-bold text-black mb-3 uppercase" style={{ fontFamily: 'Montserrat' }}>At The Church</div>
          <ul className="space-y-1 text-black" style={{ fontFamily: 'Montserrat' }}>
            <li>Just After The Ceremony</li>
            <li>Upon Entering The</li>
            <li>Wedding Hall</li>
            <li>After Dinner</li>
            <li>During Cocktail Hour</li>
            <li>While Waiting For The</li>
            <li>Couple's Entrance</li>
            <li>Near The Welcome Board</li>
            <li>At The Table Via QR Code</li>
          </ul>
        </div>
        {/* Divider */}
        <div className="hidden md:flex flex-col justify-center items-center px-4">
          <div className="w-px h-64 bg-black opacity-40" />
        </div>
        {/* Right Column */}
        <div className="flex-1 text-center md:text-left pl-0 md:pl-8">
          <div className="text-xl font-bold text-black mb-3 uppercase" style={{ fontFamily: 'Montserrat' }}>At The Wedding</div>
          <ul className="space-y-1 text-black" style={{ fontFamily: 'Montserrat' }}>
            <li>After The Church Ceremony</li>
            <li>At The Church Exit</li>
            <li>Outside The Chapel</li>
            <li>Before Leaving For The</li>
            <li>Reception Hall</li>
            <li>While Guests Gather</li>
            <li>Outside The Church</li>
            <li>Displayed Near The Church</li>
            <li>Welcome Sign</li>
          </ul>
        </div>
      </div>
      {/* Gifts Section */}
      <div className="text-center mt-10">
        <div className="text-2xl font-bold mb-2" style={{ fontFamily: 'Montserrat', color: '#E5B574' }}>Gifts</div>
        <div className="space-y-1 text-black" style={{ fontFamily: 'Montserrat' }}>
          <div>Bottle Of Wine Instead Of Flowers</div>
          <div>Books Instead Of Bouquets</div>
          <div>Charity Donation Instead Of Gifts</div>
          <div>Gift Cards Instead Of Wrapped Presents</div>
          <div>Write A Wish Instead Of Bringing A Gift</div>
        </div>
      </div>
    </CollapsibleSection>
  );
}
