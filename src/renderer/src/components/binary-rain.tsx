import { useEffect, useRef } from "react";

export default function BinaryRain() {
  const containerRef = useRef<HTMLDivElement>(null);

  // @ts-ignore
  useEffect(() => {
    const container = containerRef.current;
    const COUNT = 35;

    for (let i = 0; i < COUNT; i++) {
      const el = document.createElement("span");
      el.className =
        "binary-char text-pink-700/80 font-mono neon select-none absolute";
      el.textContent = Math.random() > 0.5 ? "1" : "0";

      const left = Math.random() * 100; // % across screen
      const size = 12; // px
      const duration = 25 + Math.random() * 10; // s
      const delay = Math.random() * 30; // s

      el.style.left = `${left}vw`;
      el.style.fontSize = `${size}px`;
      el.style.animationDuration = `${duration}s`;
      el.style.animationDelay = `${delay}s`;

      container!.appendChild(el);
    }

    return () => (container!.innerHTML = ""); // cleanup on unmount
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 overflow-hidden bg-black z-0"
    ></div>
  );
}
