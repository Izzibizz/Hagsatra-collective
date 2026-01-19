import { useState, useEffect } from "react";
import { Hero } from "../components/Hero";
import { Introductionsection } from "../components/IntroductionDiv";
import { sanity } from "../library/SanityClient";
import { usePageStore } from "../stores/pageStore";
import { HomeHelmet } from "../components/HomeHelmet";

type HeroBlock = {
  _type: "heroBlock";
  imageUrlLaptop: string;
  imageUrlMobile: string;
  symbol: string;
};


type TextBlock = {
  _type: "textBlock";
  title: string;
  body: string;
};

type IntroductionBlock = {
  _type: "introductionBlock";
  title: string;
  introImage: string;
  texts: string[];
  interval?: number;
};

type Section = HeroBlock | IntroductionBlock | TextBlock;

type Page = {
  title: string;
  sections: Section[];
};

export const HomePage: React.FC = () => {
  const [pageData, setPageData] = useState<Page | null>(null);
  const showIntro = usePageStore((state) => state.showIntro);
  const isEnglish = usePageStore((state) => state.isEnglish);

  useEffect(() => {
    const slug = isEnglish ? "homeEng" : "home";

    sanity
      .fetch(
        `
  *[_type == "page" && slug.current == "${slug}"][0]{
    title,
    sections[]{
      _type,
      title,
      body,
      texts,
      interval,
      introImage,
      imageUrlLaptop,
      imageUrlMobile,
      symbol,
      imageUrl
    }
  }
`
      )
      .then(setPageData);
  }, [isEnglish]);

  console.log(pageData);
  return (
    <>
      <HomeHelmet />
      {!showIntro && (
        <section className="bg-lightRed text-black animate-fadeIn">
          {pageData?.sections.map((section, i) => {
            switch (section._type) {
              case "heroBlock":
                return (
                  <Hero
                    key={i}
                    imageUrlLaptop={section.imageUrlLaptop}
                    imageUrlMobile={section.imageUrlMobile}
                    symbol={section.symbol}
                  />
                );

              case "introductionBlock":
                return <Introductionsection key={i} data={section} />;

              default:
                return null;
            }
          })}
        </section>
      )}
    </>
  );
};
