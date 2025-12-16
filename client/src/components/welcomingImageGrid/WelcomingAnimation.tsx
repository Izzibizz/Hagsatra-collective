import { ImageShuffle } from "./ImageShuffle";
import { useEffect } from "react";

type WelcomingBlock = {
  _type: "welcomingBlock";
  flickerImages: string[];
  h1: string;
};

type Props = {
  data: WelcomingBlock;
  onComplete: () => void;
};

export const WelcomingAnimation: React.FC <Props> = ({ data, onComplete }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      if (onComplete) onComplete(); // anropa callback
    }, 2000); // duration av animation
    return () => clearTimeout(timer);
  }, [onComplete]);

  console.log(data)
  return (
    <section className="fixed inset-0 z-50 bg-black overflow-hidden">
      {/* TEXT OVERLAY */}
      <img src={data.h1} className="absolute w-[70vw] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-60 "/>
       

      {/* IMAGE ANIMATION */}
        <ImageShuffle imageUrls={data.flickerImages} />

      
  </section>
  );
};