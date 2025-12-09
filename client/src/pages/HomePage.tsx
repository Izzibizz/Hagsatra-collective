import { BannerDiv } from "../components/BannerDiv"
import { Hero } from "../components/Hero"
import { Introductionsection } from "../components/IntroductionDiv"

export const HomePage: React.FC = () => {
  return (
    <section className="bg-lightRed text-black">
      < Hero />
      <Introductionsection/>
      <BannerDiv />
    </section>
  )
}
