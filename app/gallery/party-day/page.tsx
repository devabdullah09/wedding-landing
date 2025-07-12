'use client';
import Image from 'next/image';
import React, { useRef, useState } from 'react';
import UploadingOverlay from '@/components/gallery/UploadingOverlay';
import UploadSuccessOverlay from '@/components/gallery/UploadSuccessOverlay';
import { useRouter } from 'next/navigation';

const downloadIcon = (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="inline ml-1 text-[#C18037]">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V4" />
  </svg>
);

const initialImages = [
  '/images/Gallery/maingallery.jpg',
  '/images/Gallery/afterPArty.png',
  '/images/Gallery/weddingDay.png',
];
const initialVideos = [
  // Use a placeholder video thumbnail or a real video file if available
  { src: '/videos/sample1.mp4', thumb: '/images/placeholder.jpg' },
  { src: '/videos/sample2.mp4', thumb: '/images/placeholder.jpg' },
];

export default function PartyDayGallery() {
  const [tab, setTab] = useState<'photos' | 'videos'>('photos');
  const [images, setImages] = useState(initialImages);
  const [videos, setVideos] = useState(initialVideos);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Overlay state
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadTotal, setUploadTotal] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);
  const router = useRouter();

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    setUploadTotal(files.length);
    setUploadProgress(1);
    setUploading(true);
    // Simulate upload progress
    let idx = 1;
    const interval = setInterval(() => {
      setUploadProgress(idx);
      if (idx === files.length) {
        clearInterval(interval);
        setTimeout(() => {
          setUploading(false);
          setShowSuccess(true);
          // Actually add images/videos to gallery
          if (tab === 'photos') {
            const newImages = Array.from(files).map(file => URL.createObjectURL(file));
            setImages(prev => [...newImages, ...prev]);
          } else {
            const newVideos = Array.from(files).map(file => ({ src: URL.createObjectURL(file), thumb: '/images/placeholder.jpg' }));
            setVideos(prev => [...newVideos, ...prev]);
          }
        }, 500);
      }
      idx++;
    }, 600);
  };

  return (
    <>
      {uploading && (
        <UploadingOverlay current={uploadProgress} total={uploadTotal} />
      )}
      {showSuccess && (
        <UploadSuccessOverlay
          onViewGallery={() => router.push('/gallery/main')}
          onCountMeIn={() => setShowSuccess(false)}
        />
      )}
      <div className="min-h-screen flex flex-col items-center justify-center bg-white py-10 px-2 md:px-0 relative overflow-x-hidden" style={{ fontFamily: 'Montserrat, Arial, Helvetica, sans-serif' }}>
        <div className="relative w-full max-w-5xl bg-white rounded-2xl border border-[#C7B299] p-8 md:p-12 shadow-md mx-auto z-10" style={{ minHeight: 500 }}>
          {/* Decorative Corners and Sparkles */}
          <Image src="/images/Gallery/bottom-left-sparkle.png" alt="bottom left sparkle" width={202} height={32} className="absolute left-3 bottom-4 z-0" />
          <Image src="/images/Gallery/middle-right-sparkle.png" alt="middle right sparkle" width={280} height={42} className="absolute right-5 top-1/4 z-0" />
          <Image src="/images/Gallery/over-leaf-sparkle.png" alt="over leaf sparkle" width={252} height={32} className="absolute left-5 top-20 z-0" />

          {/* Main Content */}
          <div className="flex flex-col relative z-10">
            <div className="flex flex-row justify-between items-start mb-4">
              <div className="text-2xl md:text-3xl text-[#08080A]" style={{ fontFamily: 'Montserrat', fontWeight: 500 }}>
                Party Day
              </div>
              <div className="flex flex-col items-end">
                <div className="text-base md:text-lg font-semibold text-[#08080A] flex items-center" style={{ fontFamily: 'Montserrat', fontWeight: 500 }}>
                  UPLOAD PHOTOS/VIDEOS {downloadIcon}
                </div>
                <div className="text-xs text-[#888] mt-1" style={{ fontFamily: 'Montserrat', fontWeight: 400 }}>
                  Uploaded By 20.06.2025
                </div>
              </div>
            </div>
            {/* Tabs */}
            <div className="flex flex-row border-b border-[#C7B299] mb-4">
              <button onClick={() => setTab('photos')} className={`font-semibold mr-6 pb-2 border-b-2 ${tab === 'photos' ? 'text-[#C18037] border-[#C18037]' : 'text-[#08080A] border-transparent'}`} style={{ fontFamily: 'Montserrat', fontWeight: 500 }}>
                Photos
              </button>
              <button onClick={() => setTab('videos')} className={`font-semibold pb-2 border-b-2 ${tab === 'videos' ? 'text-[#C18037] border-[#C18037]' : 'text-[#08080A] border-transparent'}`} style={{ fontFamily: 'Montserrat', fontWeight: 500 }}>
                Videos
              </button>
            </div>
            {/* Image/Video Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {/* Upload Card */}
              <div className={`relative w-[180px] h-[180px] rounded-lg overflow-hidden group border ${tab === 'photos' ? 'border-[#E5B574]' : 'border-[#C18037]'}`}>
                <Image src="/images/Gallery/maingallery.jpg" alt="Upload" fill style={{ objectFit: 'cover' }} />
                <div className={`absolute inset-0 ${tab === 'photos' ? 'bg-[#E5B574]/70' : 'bg-[#C18037]/70'} flex flex-col items-center justify-center opacity-100 group-hover:opacity-100 transition-opacity duration-300`}>
                  <button onClick={() => fileInputRef.current?.click()} className="border border-white text-white rounded px-6 py-1 bg-transparent hover:bg-white hover:text-[#C18037] transition font-semibold" style={{ fontFamily: 'Montserrat', fontWeight: 600, fontSize: '16px', letterSpacing: '0.01em', lineHeight: 1.4 }}>Upload</button>
                  <input ref={fileInputRef} type="file" accept={tab === 'photos' ? 'image/*' : 'video/*'} multiple className="hidden" onChange={handleUpload} />
                </div>
              </div>
              {/* Gallery Images or Videos */}
              {tab === 'photos' && images.map((img, i) => (
                <Image key={i} src={img} alt={`Gallery ${i}`} width={180} height={180} className="rounded-lg object-cover" />
              ))}
              {tab === 'videos' && videos.map((vid, i) => (
                <video key={i} width={180} height={180} controls poster={vid.thumb} className="rounded-lg object-cover">
                  <source src={vid.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
} 