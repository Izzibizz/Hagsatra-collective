import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { useIsLaptop } from "../hooks/IsLaptop";
import { sanity } from "../library/SanityClient";
import { usePageStore } from "../stores/pageStore";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText } from "@portabletext/react";

// Gemensam bildtyp för gallerier
export type SanityImageItem = {
  image: string; // URL
  caption?: string; // Bildtext (valfri)
};

// Activities-sektionen
export type ActivitiesSection = {
  h3?: string;
  titleImageLaptop?: string;
  titleImageMobile: string;
  body?: PortableTextBlock[];
  images?: SanityImageItem[];
};

// Exhibitions-sektionen
export type ExhibitionsSection = {
  h3?: string;
  body?: string;
  images?: SanityImageItem[];
};

export type ActivitiesBlock = {
  _type: "activitiesBlock";
  activities?: ActivitiesSection;
  exhibitions?: ExhibitionsSection;
};

export type PageData = {
  title?: string;
  sections?: ActivitiesBlock[];
};

export const Activities: React.FC = () => {
  const [pageData, setPageData] = useState<PageData | null>(null);
  const isEnglish = usePageStore((state) => state.isEnglish);
  const isLaptop = useIsLaptop();
  const activitiesBlock = pageData?.sections?.find(
    (section) => section._type === "activitiesBlock"
  );

  useEffect(() => {
    const slug = isEnglish ? "activitiesEng" : "activities";
    sanity
      .fetch(
        `
  *[_type == "page" && slug.current == "${slug}"][0]{
    title,
    sections[]
  }
`
      )
      .then((data) => {
        console.log("FETCH RESULT:", data);
        setPageData(data);
      });
  }, [isEnglish]);

  if (!pageData) {
    return <div className="min-h-screen" />;
  }

  console.log(pageData);

  return (
    <section className="animate-fadeIn w-11/12 laptop:max-w-[1200px] mx-auto mt-6 mb-4 tablet:mt-10 laptop:mt-24 flex flex-col gap-10">
      <img
        src={
          isLaptop
            ? activitiesBlock?.activities?.titleImageLaptop
            : activitiesBlock?.activities?.titleImageMobile
        }
        alt="activities text"
      />
      <h2 className="font-bold text-xl">{activitiesBlock?.activities?.h3}</h2>
      {activitiesBlock?.activities?.body && (
        <PortableText value={activitiesBlock.activities.body} />
      )}
      <div className="grid laptop:grid-cols-2 gap-6">
        {activitiesBlock?.activities?.images?.map((image, index) => (
          <img
            key={index}
            className="object-cover"
            alt={image.caption}
            src={image.image}
          />
        ))}
      </div>
      <div className="laptop:self-end flex flex-col gap-6 items-end">
        <h4>
          {" "}
          {isEnglish
            ? "Interested in knowing more or collaborate with us?"
            : "Intresserad av att veta mer eller samarbeta med oss?"}
        </h4>
        <NavLink to="/kontakt">
          <button className="bg-darkRed text-lightRed rounded-4xl px-4 py-2 w-fit cursor-pointer">
            {isEnglish ? "Contact us" : "Kontakta oss"}
          </button>
        </NavLink>
      </div>
    </section>
  );
};
