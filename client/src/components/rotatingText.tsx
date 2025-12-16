import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

type RotatingTextProps = {
  texts: string[];
  interval?: number;
};

export const RotatingText: React.FC<RotatingTextProps> = ({
  texts,
  interval = 6000,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const t = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % texts.length);
    }, interval);
    return () => clearInterval(t);
  }, [texts, interval]);

  const text = texts[currentIndex];

  // Stabil "kaos-layout" per text
  const startOffsets = useMemo(() => {
    return text.split("").map((_, i) => ({
      y: (i % 2 === 0 ? -1 : 1) * (200 + i * 15),
    x: ((i % 3) - 1) * 350,
      rotate: ((i % 5) - 2) * 20,
    }));
  }, [text]);

  const endOffsets = useMemo(() => {
    return text.split("").map((_, i) => ({
      x: ((i % 3) - 1) * 250,
      y: (i % 2 === 0 ? -1 : 1) * (400 + i * 15),
      rotate: ((i % 7) - 3) * 120,
    }));
  }, [text]);

  return (
    <div className="flex justify-center text-xl laptop:text-6xl">
      {text.split("").map((char, i) => {
        const start = startOffsets[i];
        const end = endOffsets[i];

        return (
          <motion.span
            key={i + "-" + currentIndex}
            className="inline-block"
            initial={{
              x: start.x,
              y: start.y,
              rotate: start.rotate,
              opacity: 1,
            }}
            animate={{
              x: [start.x, 0, 0, end.x],
              y: [start.y, 0, 0, end.y],
              rotate: [start.rotate, 0, 0, end.rotate],
            }}
            transition={{
              duration: interval / 1000 - 0.5,
              ease: "easeInOut",
              times: [0, 0.3, 0.7, 1],
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        );
      })}
    </div>
  );
};
