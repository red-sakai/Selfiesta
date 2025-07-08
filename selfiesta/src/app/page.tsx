import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Home() {
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
            className={cn(
              "rounded-full px-5 py-1.5 text-lg font-medium text-white",
              "bg-[#6B5CA5]"
            )}
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
            className="rounded-full px-5 py-1.5 text-lg font-medium text-white/80 hover:text-white transition"
          >
            Capture
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="flex flex-col md:flex-row items-center justify-start min-h-[70vh] px-8 py-12 gap-12">
        {/* Left: Hand holding photos */}
        <div className="relative w-[80vw] max-w-[1000px] h-[60vw] max-h-[75vh] flex-shrink-0">
          <Image
            src="/hand with photos.png"
            alt="Hand holding photos"
            fill
            style={{ objectFit: "contain" }}
            priority
          />
        </div>
        {/* Right: Title and Description */}
        <div className="max-w-xl text-center md:text-left">
          <h1 className="text-5xl font-extrabold text-[#6B5CA5] mb-4">Selfiesta</h1>
          <p className="text-lg font-semibold text-[#9B8DD2]">
            Selfiesta is your fun and easy-to-use photo booth app built for events, parties, and everyday moments. Take selfies straight from your browser!
          </p>
          <Link
            href="/capture"
            className="inline-block mt-6 bg-gradient-to-r from-[#9B8DD2] to-[#6B5CA5] text-white rounded-full px-8 py-3 text-xl font-bold shadow-lg hover:scale-105 transition-transform"
          >
            Start Capturing
          </Link>
        </div>
      </main>
    </div>
  );
}
