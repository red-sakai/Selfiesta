"use client";
import React, { useRef, useState, useEffect } from "react";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";

// hardcoded music files
const MUSIC_LIST = [
  { src: "/music/IV of Spades - MUNDO (Lyrics).mp3", name: "IV of Spades - MUNDO" },
  { src: "/music/BINI - Pantropiko (Lyrics).mp3", name: "BINI - Pantropiko" },
  { src: "/music/IV of Spades - Hey Barbara (LYRICS).mp3", name: "IV of Spades - Hey Barbara" },
];

export default function MusicPlayer() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.6); // default to 60%
  const audioRef = useRef<HTMLAudioElement>(null);

  // try to play music when first loaded in website
  useEffect(() => {
    setPlaying(true);
    setTimeout(() => {
      audioRef.current?.play().catch(() => {});
    }, 0);

    // play on first user interaction if not already playing
    const resumeAudio = () => {
      if (!audioRef.current) return;
      if (audioRef.current.paused) {
        audioRef.current.play().catch(() => {});
        setPlaying(true);
      }
      window.removeEventListener("click", resumeAudio);
      window.removeEventListener("touchstart", resumeAudio);
    };
    window.addEventListener("click", resumeAudio);
    window.addEventListener("touchstart", resumeAudio);

    return () => {
      window.removeEventListener("click", resumeAudio);
      window.removeEventListener("touchstart", resumeAudio);
    };
  }, []);

  useEffect(() => {
    if (playing) {
      audioRef.current?.play().catch(() => {});
    } else {
      audioRef.current?.pause();
    }
  }, [playing, current]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handlePlayPause = () => setPlaying((p) => !p);

  const handleNext = () => {
    setCurrent((c) => (c + 1) % MUSIC_LIST.length);
    setPlaying(true);
  };

  const handlePrev = () => {
    setCurrent((c) => (c - 1 + MUSIC_LIST.length) % MUSIC_LIST.length);
    setPlaying(true);
  };

  const handleEnded = () => handleNext();

  return (
    <div
      className="fixed bottom-6 right-6 z-50 flex items-center gap-4 bg-white/90 rounded-2xl shadow-lg px-4 py-3"
      style={{ minWidth: 260 }}
    >
      {/* React Icon */}
      <div
        className={`w-12 h-12 rounded-full border-4 border-[#9B8DD2] flex items-center justify-center bg-[#6B5CA5]/10 mr-2
          ${playing ? "animate-spin-slow" : ""}`}
        style={{
          transition: "box-shadow 0.2s",
          boxShadow: playing ? "0 0 12px #9B8DD2" : undefined,
        }}
      >
        <div className="w-6 h-6 rounded-full bg-[#6B5CA5]" />
      </div>
      {/* Song Info & Controls */}
      <div className="flex flex-col flex-1 min-w-0">
        <div className="truncate font-semibold text-[#6B5CA5] text-base">
          {MUSIC_LIST[current]?.name}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <button onClick={handlePrev} aria-label="Previous" className="text-[#9B8DD2] hover:text-[#6B5CA5]">
            <FaStepBackward />
          </button>
          <button onClick={handlePlayPause} aria-label={playing ? "Pause" : "Play"} className="text-[#9B8DD2] hover:text-[#6B5CA5]">
            {playing ? <FaPause /> : <FaPlay />}
          </button>
          <button onClick={handleNext} aria-label="Next" className="text-[#9B8DD2] hover:text-[#6B5CA5]">
            <FaStepForward />
          </button>
        </div>
        {/* Volume Slider */}
        <input
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={e => setVolume(Number(e.target.value))}
          className="mt-2 w-full accent-[#9B8DD2]"
          aria-label="Volume"
        />
      </div>
      <audio
        ref={audioRef}
        src={MUSIC_LIST[current]?.src}
        onEnded={handleEnded}
        preload="auto"
      />
      <style jsx global>{`
        @keyframes spin-slow {
          100% { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
      `}</style>
    </div>
  );
}
