import { sanity } from "../library/SanityClient";
import { useEffect, useState } from "react";

type AboutData = {
  H2: string;
  IntroText: string;
  history: string;
  activities: {
    h3: string;
    body: string;
    images: {
      url: string;
      caption?: string;
    }[];
  };
  exhibitions: {
    h3: string;
    body: string;
    images: {
      url: string;
      caption?: string;
    }[];
  };
};

export const AboutPage: React.FC = () => {
  const [aboutData, setAboutData] = useState<AboutData | null>(null);

  const query = `
*[_type == "page" && slug.current == "about"][0]{
  sections[_type == "aboutBlock"][0]{
    H2,
    IntroText,
    history,

    activities{
      h3,
      body,
      images[]{
        url,
        caption
      }
    },

    exhibitions{
      h3,
      body,
      images[]{
        url,
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
    <section className="w-11/12 laptop:w-9/12 mx-auto mt-10">
      <h2 className="font-hagsatra text-4xl ">{aboutData?.H2}</h2>
      <p>{aboutData?.IntroText}</p>
      <img src={aboutData?.exhibitions.images[0].url} />
    </section>
  );
};
