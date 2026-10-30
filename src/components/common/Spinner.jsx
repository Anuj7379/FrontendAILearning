import React from "react";

const Spinner = ({ size = 56 }) => {
  return (
    <div className="flex items-center justify-center">
      <div
        className="relative"
        style={{ width: size, height: size }}
      >
        {/* Outer Orbit */}
        <div className="absolute inset-0 rounded-full 
          border-[3px] border-emerald-500/30 
          animate-spin-slow blur-[0.5px]" />

        {/* Inner Orbit */}
        <div className="absolute inset-[8px] rounded-full 
          border-[3px] border-emerald-400 
          border-t-transparent 
          animate-spin-reverse shadow-[0_0_12px_rgba(16,185,129,0.8)]" />

        {/* Core Pulse */}
        <div className="absolute inset-[18px] rounded-full 
          bg-emerald-500 
          animate-pulse shadow-[0_0_20px_rgba(16,185,129,1)]" />
      </div>
    </div>
  );
};

export default Spinner;
