"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

const Contact = () => {
    const [form, setForm] = useState({ email: "", message: "" });
    const [status, setStatus] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setStatus("Sending...");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setStatus("Email sent!");
        setForm({ email: "", message: "" });
      } else {
        setStatus("Failed to send. Try again.");
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
      {/* Contact Form */}
      <main className="flex flex-col items-center justify-center min-h-[70vh]  px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-extrabold text-[#6B5CA5] mt-8 mb-2 text-center">Send me an email!</h1>
        <p className="text-lg font-semibold text-[#9B8DD2] text-center mb-6">
          Got questions or feedback?<br />
          <span className="font-bold">I&apos;d love to hear from you! Drop me an email<br />and I&apos;ll get back to you as soon as possible. - Jhered</span>
        </p>
        <form onSubmit={handleSubmit} className="w-full max-w-3xl flex flex-col gap-6">
          <input
            type="email"
            name="email"
            required
            placeholder="From: youremail@gmail.com"
            value={form.email}
            onChange={handleChange}
            className="rounded-2xl border-4 border-[#9B8DD2] px-6 py-4 text-[#6B5CA5] text-xl font-medium placeholder-italic placeholder:text-[#6B5CA5]/80 outline-none"
          />
          <textarea
            name="message"
            required
            placeholder="Contents of the email..."
            value={form.message}
            onChange={handleChange}
            rows={10}
            className="rounded-2xl border-4 border-[#9B8DD2] px-6 py-4 text-[#6B5CA5] text-xl font-medium placeholder-italic placeholder:text-[#6B5CA5]/80 outline-none resize-none"
          />
          <button
            type="submit"
            className="self-end bg-[#6B5CA5] text-white rounded-full px-10 py-3 text-xl font-semibold hover:bg-[#9B8DD2] transition"
          >
            Send
          </button>
          {status && <div className="text-center text-[#6B5CA5] font-semibold">{status}</div>}
        </form>
      </main>
    </div>
  )
}

export default Contact
