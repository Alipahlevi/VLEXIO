import React from "react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-gray-200 bg-white pl-0 sm:pl-16 relative">
      <div className="hidden sm:block absolute left-12 top-0 bottom-0 w-px bg-gray-200 pointer-events-none" />
      <div className="max-w-[1600px] mx-auto px-3 py-2 text-[11px] flex items-center justify-between">
        <div className="inline-flex items-center gap-1.5 text-gray-700">
          <img
            src="/LogoGedung.png"
            alt="Facility"
            className="h-3.5 w-3.5 object-contain opacity-80"
            draggable="false"
          />
          <span className="font-medium">JEC @ KEDOYA</span>
        </div>
        <div className="text-gray-500">2023 © PT. Nittasana Dharma.</div>
      </div>
    </footer>
  );
}
