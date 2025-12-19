import { sanity } from "../library/SanityClient";
import { useEffect, useState } from "react";
import { useIsLaptop } from "../hooks/IsLaptop";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText } from "@portabletext/react";

type AboutData = {
  H2: string;
  IntroText: string;
  historyText: string;
  titleImage: string;
  thanksTo: PortableTextBlock[];
  activities: {
    h3: string;
    body: string;
    titleImage: string;
    images: {
      image: string;
      caption?: string;
    }[];
  };
  exhibitions: {
    h3: string;
    body: string;
    images: {
      image: string;
      caption?: string;
    }[];
  };
};

export const AboutPage: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);
  const isLaptop = useIsLaptop();

  const query = `
*[_type == "page" && slug.current == "about"][0]{
  sections[_type == "aboutBlock"][0]{
    H2,
    IntroText,
    historyText,
    titleImage,
    thanksTo,

    activities{
      h3,
      body,
      titleImage,
      images[]{
        image,
        caption
      }
    },

    exhibitions{
      h3,
      body,
      images[]{
        image,
        caption
      }
    }
  }
}
`;

  useEffect(() => {
    sanity.fetch(query).then((data) => {
      console.log(data);
      setAboutData(data.sections);
    });
  }, []);

  console.log(aboutData);
  return (
    <section className="w-11/12 laptop:w-9/12 mx-auto mt-10 laptop:mt-18 flex flex-col gap-14">
      <div className="flex justify-between">
        <div className="flex flex-col gap-8">
          <img
            src={aboutData?.titleImage}
            className="tablet:w-1/2"
            alt="Vilka är vi?"
          />
          <p className="tablet:w-2/3 laptop:w-2/3">{aboutData?.IntroText}</p>
          <p className="tablet:w-2/3 laptop:w-2/3">{aboutData?.historyText}</p>
        </div>
        {isLaptop && (
          <img
            src={aboutData?.exhibitions.images[0].image}
            className="w-1/4 max-w-[400px]"
          />
        )}
      </div>
      {!isLaptop && (
        <img
          src={aboutData?.exhibitions.images[0].image}
          className="tablet:w-1/2"
        />
      )}
      {aboutData?.thanksTo && (
        <PortableText
          value={aboutData?.thanksTo}
          components={{
            marks: {
              link: ({ value, children }) => (
                <a
                  href={value.href}
                  target={value.blank ? "_blank" : "_self"}
                  rel="noopener noreferrer"
                  className="underline hover:opacity-80"
                >
                  {children}
                </a>
              ),
            },
          }}
        />
      )}
      <div className="flex flex-col laptop:flex-row gap-8">
      <img src={aboutData?.activities.images[0].image} className="tablet:w-1/3 laptop:w-1/2 aspect-[3/2] object-cover" alt="aktivitet"/>
       <img src={aboutData?.activities.images[1].image} className="tablet:w-1/3 laptop:w-1/2 aspect-[3/2] object-cover laptop:max-w-[500px]" alt="aktivitet"/>
      </div>
    </section>
  );
};
