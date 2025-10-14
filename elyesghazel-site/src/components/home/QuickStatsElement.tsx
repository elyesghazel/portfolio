import React from "react";
import quickstats from "./quickstats";

export default function QuickStatsElement() {
  const data = quickstats();
  return (
    <div className="usp flex flex-row gap-7 md:gap-[75px] justify-center items-center w-full flex-wrap">
      {data.map(({ label, value, icon }, idx) => (
        <div
          id={String(idx)}
          className="flex flex-col w-[140px] md:w-[300px] gap-y-3"
        >
          <div className="top flex flex-row justify-between items-center w-full">
            <h1 className="text-2xl md:text-4xl font-semibold">
              {value}
              <span className="text-gradient">+</span>
            </h1>
            <div className="md:inline-block hidden">
              {React.createElement(icon, { size: 40 }) as React.ReactNode}
            </div>
            {/* Mobile View */}
            <div className="md:hidden inline-block">
              {React.createElement(icon, { size: 30 }) as React.ReactNode}
            </div>
          </div>
          <div className="bottom flex flex-col gap-1 justify-start border-b-current border-b-2">
            <span className="text-[16px] md:text-xl py-2 text-(--text-subtitle) font-light">
              {label}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}
