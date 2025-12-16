import { FlickerCell } from "./FlickerCell";
import { useIsLaptop } from "../../hooks/IsLaptop";

type Props = {
  imageUrls: string[];
};

export const ImageShuffle: React.FC<Props> = ({ imageUrls }) => {
  
    const isLaptop = useIsLaptop();

  return (
    <div className={`grid ${isLaptop ? "grid-cols-6 grid-rows-3" : "grid-cols-2 grid-rows-3"} h-screen w-full`}>
      {Array.from({ length: 18 }).map((_, i) => (
        <FlickerCell key={i} imageUrls={imageUrls} />
      ))}
    </div>
  );
};
