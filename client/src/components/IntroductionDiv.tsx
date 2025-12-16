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
    <section className="bg-darkRed rounded-t-4xl p-20 text-lightRed">
      <div className="laptop:w-10/12 mx-auto">
      <RotatingText texts={data.texts} interval={data.interval}/>
    {/*   <img src={data.introImage} className="laptop:w-1/3 laptop:max-w-500px]" alt="skaparverkstad"/> */}
      </div>
    </section>
  )
}
