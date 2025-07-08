"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Finished = () => {
  const [photo, setPhoto] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const savedPhoto = localStorage.getItem("selfiesta-photo");
    setPhoto(savedPhoto);
  }, []);

  const handleDownload = () => {
    if (photo) {
      const link = document.createElement("a");
      link.href = photo;
      link.download = "selfiesta-photo.png";
      link.click();
    }
  };

  const handleGoAgain = () => {
    router.push("/capture");
  };

  return (
    <div>
      {/* Header */}
      <header className="bg-[#9B8DD2] px-8 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Image src="/selfiesta text middle with logo.PNG" alt="Selfiesta Logo" width={190} height={190} />
        </div>
        <nav className="flex gap-8">
          <Link href="/" className="rounded-full px-5 py-1.5 text-lg font-medium text-white/80 hover:text-white transition">Home</Link>
          <Link href="/contact" className="rounded-full px-5 py-1.5 text-lg font-medium text-white/80 hover:text-white transition">Contact</Link>
          <Link href="/capture" className={cn("rounded-full px-5 py-1.5 text-lg font-medium text-white", "bg-[#6B5CA5]")}>Capture</Link>
        </nav>
      </header>

      {/* Finished Content */}
      <main className="flex flex-col md:flex-row items-center justify-center min-h-[70vh] px-4 py-8 gap-16">
        <div className="border-8 border-[#9B8DD2] w-[520px] h-[520px] flex items-center justify-center bg-white shadow-lg">
          {photo && (
            <Image
              src={photo}
              alt="Captured"
              width={500}
              height={500}
              className="w-full h-full object-cover"
              unoptimized
            />
          )}
        </div>
        <div className="flex flex-col items-center md:items-start justify-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-[#6B5CA5] mb-2 text-center md:text-left">
            You look wonderful!
          </h1>
          <p className="text-[#9B8DD2] font-bold text-center md:text-left text-xl mb-4">
            Looking good! <br />
            Selfiesta is all about capturing joyful moments —<br />
            one selfie at a time. Thanks for making it unforgettable!
          </p>
          <div className="flex gap-6 mt-4">
            <button
              onClick={handleDownload}
              className="bg-[#9B8DD2] text-white rounded-full px-8 py-2 text-xl font-medium hover:bg-[#6B5CA5] transition"
            >
              Download
            </button>
            <button
              onClick={handleGoAgain}
              className="bg-[#9B8DD2] text-white rounded-full px-8 py-2 text-xl font-medium hover:bg-[#6B5CA5] transition"
            >
              Go Again
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Finished;