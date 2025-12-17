import { useIsLaptop } from "../hooks/IsLaptop";

type HeroProps = {
  imageUrlLaptop: string;
  imageUrlMobile: string;
  symbol: string;
};

export const Hero: React.FC<HeroProps> = ({
  imageUrlLaptop,
  imageUrlMobile,
  symbol,
}) => {
  const isLaptop = useIsLaptop();

  return (
    <section className="pb-10 min-h-[50vh] laptop:max-h-[90vh] animate-fadeIn flex flex-col gap-6">
      {(imageUrlLaptop || imageUrlMobile) && (
        <img
          src={isLaptop ? imageUrlLaptop : imageUrlMobile}
          className=" max-h-[80vh]"
          alt="konstnärsateljeer"
        />
      )}
      {!isLaptop && symbol && <img src={symbol} alt="symbol" className="" />}
    </section>
  );
};
