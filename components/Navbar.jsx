import React, { useState } from "react";

export default function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  return (
    <header className="w-full h-11 flex items-stretch border-b border-gray-200 bg-white sticky top-0 z-[70] select-none">
      <div className="w-12 h-full flex items-center justify-center border-r border-gray-200">
        <img
          src="/LogoNavOpen.png"
          alt="Nav"
          className="h-5 w-5 object-contain"
          draggable="false"
        />
      </div>

      {/* MAIN CONTENT BAR */}
      <div className="flex items-center flex-1 min-w-0 px-3 lg:px-5">
        <div className="flex items-center gap-2 pr-3 shrink-0">
          <img
            src="/LogoVlexio.png"
            alt="Vlexio Logo"
            className="h-5 w-auto"
            draggable="false"
          />
        </div>

        <Separator />

        <div className="hidden md:flex items-center gap-1.5 px-3 shrink-0">
          <img src="/LogoNotifNav.png" alt="Notifications" />
          <img src="/LogoLockNav.png" alt="Security" />
        </div>

        <Separator className="hidden md:inline-flex" />

        <div className="ml-3 flex-1 max-w-[560px]">
          <div className="relative group">
            <input
              type="text"
              placeholder="Search page..."
              className="h-10 w-full rounded-lg border border-gray-300 bg-white/80 backdrop-blur-sm pl-10 pr-16 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition shadow-sm"
            />
            {/* Search icon */}
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-blue-500">
              <img src="/LogoSearchNav.png" alt="Search" className="h-5 w-5" />
            </span>
            {/* Command badge */}
            <span className="absolute right-2 top-1/2 -translate-y-1/2 select-none bg-blue-700 text-white text-[11px] font-medium tracking-wide px-2.5 py-1 rounded-md shadow-sm leading-none">
              ⌘ K
            </span>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center gap-0 pl-3 pr-2">
        <div className="hidden md:flex items-center gap-1.5 pr-3">
          <img src="/LogoSettingNav.png" alt="Settings" />
          <img src="/LogoWideNav.png" alt="Apps" />
        </div>
        <Separator className="hidden md:inline-flex" />
        <div className="hidden lg:flex flex-col leading-tight px-3 text-right">
          <span className="text-[9px] text-gray-400">Your ip address is</span>
          <span className="mt-0.5 inline-block px-2 py-0.5 rounded text-[10px] font-semibold bg-blue-100 text-blue-700 tracking-tight">
            172.10.20.151
          </span>
        </div>
        <Separator className="hidden lg:inline-flex" />
        <button
          className="flex items-center gap-2 pl-2 pr-3 h-9 rounded-full hover:bg-gray-50 transition"
          title="User menu"
        >
          <img
            src="/AvatarNav.png"
            alt="User"
            className="h-7 w-7 rounded-full object-cover border border-gray-200"
            draggable="false"
          />
        </button>
      </div>
    </header>
  );
}

/* Components */
function IconButton({ src, alt, badge }) {
  return (
    <div className="relative">
      <button
        className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-gray-100 transition"
        aria-label={alt}
        title={alt}
        type="button"
      >
        <img
          src={src}
          alt={alt}
          className="h-4 w-4 object-contain"
          draggable="false"
        />
      </button>
      {badge && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] leading-none px-1.5 py-[2px] rounded-full font-semibold">
          {badge}
        </span>
      )}
    </div>
  );
}

function Separator({ className = "" }) {
  return <span className={`h-5 w-px bg-gray-200 ${className}`} />;
}
