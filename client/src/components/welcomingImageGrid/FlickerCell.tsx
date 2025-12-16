import { useEffect, useState } from "react";

type Props = {
  imageUrls: string[];
};

export const FlickerCell: React.FC<Props> = ({ imageUrls }) => {
  const [index, setIndex] = useState(
    Math.floor(Math.random() * imageUrls.length)
  );

  useEffect(() => {
    const timeout = setInterval(() => {
      setIndex((i) => (i + 1) % imageUrls.length);
    }, 200 + Math.random() * 800);

    return () => clearInterval(timeout);
  }, [imageUrls]);

  return (
    <div
      className="w-full h-full bg-cover bg-center transition-opacity duration-200"
      style={{
        backgroundImage: `url(${imageUrls[index]})`,
        filter: "contrast(1.05) saturate(1.1)",
      }}
    />
  );
};
