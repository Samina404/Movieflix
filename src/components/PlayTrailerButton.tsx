"use client";

import { useState } from "react";
import TrailerModal from "./TrailerModal";

interface PlayTrailerButtonProps {
  videoKey: string | null;
}

export default function PlayTrailerButton({ videoKey }: PlayTrailerButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  if (!videoKey) {
    return (
      <button 
        disabled 
        className="flex items-center gap-2 px-8 py-4 bg-foreground/10 text-foreground-dim font-bold rounded-xl cursor-not-allowed opacity-50"
      >
        No Trailer Available
      </button>
    );
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#f94a29] to-[#ef233c] text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg active:scale-95 group"
      >
        <svg className="w-5 h-5 fill-current transform transition-transform group-hover:translate-x-1" viewBox="0 0 24 24">
          <path d="M8 5v14l11-7z" />
        </svg>
        Play Trailer
      </button>

      <TrailerModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        videoKey={videoKey} 
      />
    </>
  );
}
