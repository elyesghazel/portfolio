import React, { useState, useEffect } from "react";

export default function TypewriterName() {
  const name = "Elyes Ghazel";
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayText(name.substring(0, i));
      i++;
      if (i > name.length) clearInterval(interval);
    }, 100); //speed

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="font-mono font-bold text-xl tracking-tighter flex items-center">
      <span className="text-blue-500 mr-2">&gt;</span>
      <span>{displayText}</span>
      <span className="w-[10px] h-[24px] bg-blue-500 ml-1 animate-pulse-fast"></span>
    </div>
  );
}
