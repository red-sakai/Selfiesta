"use client";

import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Capture = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null); // audio ref for sfx
  const [permission, setPermission] = useState<"pending" | "granted" | "denied">("pending");
  const router = useRouter();

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        setPermission("granted");
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch(() => {
        setPermission("denied");
      });
  }, []);

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const photoData = canvas.toDataURL("image/png");
        localStorage.setItem("selfiesta-photo", photoData);
        // 2. Play camera sound
        if (audioRef.current) {
          audioRef.current.currentTime = 0;
          audioRef.current.play();
          audioRef.current.onended = () => {
            router.push("/finished");
          };
        } else {
          router.push("/finished");
        }
      }
    }
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-[#9B8DD2] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          { /* proper way of initializing an image in next.js */}
          <Image src="/selfiesta text middle with logo.PNG" 
          alt="Selfiesta Logo" 
          width={190} 
          height={190} />

        </div>
        <nav className="flex gap-8">
          {/* link is a special component of next.js for client side navigation, it's just like html href */}
          <Link
            href="/"
            className="rounded-full px-5 py-1.5 text-lg font-medium text-white/80 hover:text-white transition"
          >
            Home
          </Link>
          <Link
            href="/contact"
            className="rounded-full px-5 py-1.5 text-lg font-medium text-white/80 hover:text-white transition"
          >
            Contact
          </Link>
          <Link
            href="/capture"
            className={cn(
              "rounded-full px-5 py-1.5 text-lg font-medium text-white",
              "bg-[#6B5CA5]"
            )}
          >
            Capture
          </Link>
        </nav>
      </header>

      {/* Capture Content */}
      <main className="flex flex-col items-center justify-center min-h-[70vh] px-4 py-8">
        <h1 className="text-5xl md:text-6xl font-extrabold text-[#6B5CA5] mt-8 mb-8 text-center">Smile!</h1>
        <div
          className="border-8 border-[#9B8DD2] rounded-none w-[550px] h-[550px] flex items-center justify-center bg-white mb-6 cursor-pointer transition-transform hover:scale-105"
          onClick={permission === "granted" ? handleCapture : undefined}
          title={permission === "granted" ? "Click to take a photo!" : ""}
        >
          {permission !== "denied" ? (
            <video
              ref={videoRef}
              autoPlay
              playsInline
              className="w-full h-full object-cover"
              style={{ background: "white" }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-[#9B8DD2] text-2xl font-semibold">
              Camera access denied
            </div>
          )}
          <canvas ref={canvasRef} className="hidden" />
        </div>
        <audio ref={audioRef} src="/camera shutter.mp3" preload="auto" /> {/* audio element */}
        <p className="text-[#9B8DD2] font-bold text-center text-lg mb-4">
          Enable camera permissions so we can take your wonderful photo!<br />
          <span className="text-[#6B5CA5] font-semibold text-base block mt-2">
            Click anywhere inside the box to take a photo.
          </span>
        </p>
      </main>
    </div>
  );
};

export default Capture;
