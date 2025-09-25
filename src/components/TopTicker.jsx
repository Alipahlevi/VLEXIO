import React from "react";

export default function TopTicker() {
  const messages = [
    "(1/3) Info: Dr. Johan akan cuti dari tanggal 16 September 2025 sampai 20 September 2025 karena seminar.",
    "(2/3) Info: Dr. Dr. Iwan Soebijantoro, SpM(K) Tidak Praktik 11-28 Juli 2025, karena Workshop @Bangkok.",
    "(3/3) Reminder: Input data rekam medis pasien harus diselesaikan sebelum pukul 17:00 setiap hari",
  ];
  return (
    <div className="ticker bg-[#0b2a5b] text-white h-7 text-[12px] relative">
      <div className="max-w-[1600px] mx-auto px-3 h-full flex items-center gap-2">
        <img
          src="/LogoDanger.png"
          alt="Alert"
          className="h-4 w-4 object-contain shrink-0"
          draggable="false"
        />
        <div className="ticker__viewport">
          <div className="ticker__track">
            <div className="ticker__content">
              {messages.map((m, i) => (
                <span key={i} className="px-8 opacity-90">
                  {m}
                </span>
              ))}
            </div>
            {/* duplicate content for seamless loop */}
            <div className="ticker__content" aria-hidden>
              {messages.map((m, i) => (
                <span key={"dup-" + i} className="px-8 opacity-90">
                  {m}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
