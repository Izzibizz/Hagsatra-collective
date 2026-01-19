import React from "react";
import { useEffect, useState } from "react";
import Routes from "./routes/Routes";
import { sanity } from "./library/SanityClient";
import { Header } from "./components/Header";
import { ScrollToTop } from "./components/ScrollToTop";
import { Footer } from "./components/Footer";
import { WelcomingAnimation } from "./components/welcomingImageGrid/WelcomingAnimation";
import { usePageStore } from "./stores/pageStore";
import { LanguageButton } from "./components/LanguageButton";
import { BannerDiv } from "./components/BannerDiv";

type WelcomingBlock = {
  _type: "welcomingBlock";
  flickerImages: string[];
  h1: string;
};

type BannerBlock = {
  _type: "bannerBlock";
  imageUrl: string;
};

const App: React.FC = () => {
  const [animationData, setAnimationData] = useState<WelcomingBlock | null>(
    null,
  );
  const [bannerData, setBannerData] = useState<BannerBlock | null>(null);
  const showIntro = usePageStore((state) => state.showIntro);
  const hideIntro = usePageStore((state) => state.hideIntro);

  useEffect(() => {
    sanity
      .fetch(
        `
      *[_type == "page" && slug.current == "home"][0]
        .sections[_type == "welcomingBlock"][0]{
          _type,
          flickerImages,
          h1
        }
      `,
      )
      .then(setAnimationData);
  }, []);
  useEffect(() => {
    sanity
      .fetch(
        `
      *[_type == "page" && slug.current == "home"][0]
        .sections[_type == "bannerBlock"][0]{
          imageUrl
        }
      `,
      )
      .then(setBannerData);
  }, []);

  console.log(animationData);

  return (
    <>
      <ScrollToTop />
      {showIntro && animationData && (
        <div className="fixed inset-0 z-[100]">
          <WelcomingAnimation data={animationData} onComplete={hideIntro} />
        </div>
      )}
      <div
        className={`max-w-screen min-h-screen flex flex-col overflow-hidden relative font-main text-darkRed`}
      >
        <Header />
        <main className={`flex-grow ${"pt-38 laptop:pt-24"} `}>
          <Routes />
          <LanguageButton />
        </main>
        {bannerData && (
        <BannerDiv imageUrl={bannerData?.imageUrl}/>
        )}
        <Footer />
      </div>
    </>
  );
};

export default App;
