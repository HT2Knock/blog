import { useEffect } from "react";

export const FlagTile = () => {
  useEffect(() => {}, []);

  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/10 p-4 shadow-lg backdrop-blur-md lg:row-span-2 dark:shadow-black/50">
      <svg
        className="rounded"
        viewBox="0 0 30 20"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <rect width="30" height="20" fill="#C8102E" />
        <polygon
          fill="#FFCC00"
          points="15,4 11.47,14.85 20.71,8.15 9.29,8.15 18.53,14.85"
        />
      </svg>
      <h3 className="mt-8 text-2xl">Built with ❤️ + caffeine</h3>
    </div>
  );
};
