import React from 'react'
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const contact = () => {
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
            className={cn(
              "rounded-full px-5 py-1.5 text-lg font-medium text-white",
              "bg-[#6B5CA5]"
            )}
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
    </div>
  )
}

export default contact
