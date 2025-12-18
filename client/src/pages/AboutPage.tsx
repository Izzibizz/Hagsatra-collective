import { sanity } from "../library/SanityClient";
import { useEffect, useState } from "react";

export const AboutPage: React.FC = () => {
  const [aboutData, setAboutData] = useState();

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
      setAboutData(data);
    });
  }, []);

  console.log(aboutData)
  return <section>Om oss</section>;
};
