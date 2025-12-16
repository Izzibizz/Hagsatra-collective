import { RotatingText } from "./rotatingText"

type IntroductionBlock = {
  _type: "introductionBlock";
  title: string;
  introImage: string;
  texts: string[];
  interval?: number;
};

type IntroductionProps = {
  data: IntroductionBlock;
};

export const Introductionsection: React.FC<IntroductionProps> = ({ data }) => {
  return (
    <section className="bg-darkRed h-[200px] rounded-t-4xl py-20 px-6 text-lightRed">
      <RotatingText texts={data.texts} interval={data.interval}/>
    </section>
  )
}
