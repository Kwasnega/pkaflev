"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  images: { src: string; title: string }[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
}

export function LookbookModal({
  isOpen,
  onClose,
  images,
  currentIndex,
  onIndexChange,
}: LookbookModalProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const nextImage = () => {
    onIndexChange((currentIndex + 1) % images.length);
  };

  const prevImage = () => {
    onIndexChange((currentIndex - 1 + images.length) % images.length);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-white flex flex-col lg:flex-row items-center justify-center p-6 md:p-12 animate-in fade-in duration-300">
      
      {/* Top Right: CLOSE */}
      <button 
        onClick={onClose}
        className="absolute top-8 right-8 text-[11px] tracking-[0.4em] font-bold uppercase hover:opacity-50 transition-opacity z-10"
      >
        CLOSE
      </button>

      {/* Left Content (Counter & VIEW ALL) */}
      <div className="lg:absolute lg:left-12 lg:top-1/2 lg:-translate-y-1/2 flex flex-col items-center lg:items-start gap-8 mt-12 lg:mt-0 text-center lg:text-left z-10 w-full lg:w-fit">
        <div className="space-y-1">
          <p className="text-xl md:text-2xl font-black tracking-tighter">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
        <button 
          onClick={onClose}
          className="text-[10px] md:text-[11px] tracking-[0.4em] font-bold uppercase hover:opacity-50 transition-opacity"
        >
          VIEW ALL
        </button>
      </div>

      {/* Center Image Container */}
      <div className="relative flex-1 w-full max-w-4xl h-full flex items-center justify-center">
        {/* Navigation Arrows */}
        <button 
          onClick={prevImage}
          className="absolute left-0 md:-left-12 p-2 hover:opacity-50 transition-opacity z-10 hidden md:block"
        >
          <ChevronLeft className="w-8 h-8 stroke-1" />
        </button>

        <div className="relative aspect-[3/4] w-full max-h-[70vh] md:max-h-[85vh] animate-in zoom-in-95 duration-500">
          <Image
            src={images[currentIndex].src}
            alt={images[currentIndex].title}
            fill
            className="object-contain"
            priority
          />
        </div>

        <button 
          onClick={nextImage}
          className="absolute right-0 md:-right-12 p-2 hover:opacity-50 transition-opacity z-10 hidden md:block"
        >
          <ChevronRight className="w-8 h-8 stroke-1" />
        </button>
        
        {/* Mobile Swipe Simulation / Taps */}
        <div className="absolute inset-0 flex md:hidden pointer-events-none">
          <div className="w-1/2 h-full pointer-events-auto cursor-pointer" onClick={prevImage} />
          <div className="w-1/2 h-full pointer-events-auto cursor-pointer" onClick={nextImage} />
        </div>
      </div>
    </div>
  );
}
