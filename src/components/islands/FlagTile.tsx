import { useEffect, useRef } from "react";

export const FlagTile = () => {
  const flagRef = useRef(null);

  useEffect(() => {}, []);

  return (
    <svg
      className="translsate-1/2 h-auto w-full max-w-xs"
      width="900"
      height="600"
      viewBox="0 0 30 20"
      xmlns="http://www.w3.org/2000/svg"
      version="1.1"
    >
      <g ref={flagRef}>
        <rect width="30" height="20" fill="#C8102E" />
        <polygon
          fill="#FFCC00"
          points="15,4 11.47,14.85 20.71,8.15 9.29,8.15 18.53,14.85"
        />
      </g>
    </svg>
  );
};
