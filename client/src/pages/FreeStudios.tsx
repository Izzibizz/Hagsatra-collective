import { useState, useEffect } from "react";
import { NavLink } from "react-router";
import { sanity } from "../library/SanityClient";
import { useIsLaptop } from "../hooks/IsLaptop";
import { usePageStore } from "../stores/pageStore";

export type AvailableStudio = {
  name: string;
  size?: number;
  image?: string;
  description?: string;
  price?: number;
  availableFrom?: string; // ISO string
};

export type StudiosBlock = {
  _type: "studiosBlock";
  imageUrl: string;
  h2LaptopImageUrl: string;
  h2MobileImageUrl: string;
  h2AvailableLaptopImageUrl: string;
  h2AvailableMobileImageUrl: string;
  locationImageUrl: string;
  descriptionH3: string;
  description: string;
  availability: "yes" | "no";
  availableStudios?: AvailableStudio[];
  bannerImageUrl: string;
};

type StudioPageData = {
  title: string;
  sections: StudiosBlock[];
};

export const FreeStudios: React.FC = () => {
  const [pageData, setPageData] = useState<StudioPageData | null>(null);
  const isLaptop = useIsLaptop();
  const isEnglish = usePageStore((state) => state.isEnglish);
  const showAvailableStudios = pageData?.sections[0].availability === "yes";

  useEffect(() => {
    const slug = isEnglish ? "studioEng" : "studio";
    sanity
      .fetch(
        `
  *[_type == "page" && slug.current == "${slug}"][0]{
    title,
    sections[]
  }
`,
      )
      .then((data) => {
        console.log("FETCH RESULT:", data);
        setPageData(data);
      });
  }, [isEnglish]);

  if (!pageData) {
    return <div className="min-h-screen" />;
  }

  console.log(pageData, pageData?.sections[0].imageUrl);

  return (
    <section className="animate-fadeIn w-11/12 laptop:max-w-[1200px] mx-auto mt-6 mb-10 laptop:mb-24 tablet:mt-10 laptop:mt-18 flex flex-col gap-10 laptop:gap-20">
      {showAvailableStudios ? (
        <>
          <img
            src={
              isLaptop
                ? pageData?.sections[0].h2AvailableLaptopImageUrl
                : pageData?.sections[0].h2AvailableMobileImageUrl
            }
            alt="våra lediga ateljeer"
            className="laptop:max-w-[800px] laptop:self-center"
          />
          <img
            src={pageData?.sections[0].imageUrl}
            alt="planritning Hagsatra collective"
            className=""
          />
          <div className="flex flex-col gap-4">
            <h3 className="text-xl font-semibold">
              {" "}
              {isEnglish ? "Available" : "Tillgängligt"}
            </h3>
            <div className="available-studios grid laptop:grid-cols-2">
              {pageData?.sections[0].availableStudios?.map((studio, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-2 bg-darkRed text-lightRed p-4 py-6"
                >
                  <h4 className="text-xl">{studio.name}</h4>
                  <p>
                    {studio.size} {isEnglish ? "sqm" : "kvm"}
                  </p>
                  <p>{studio.description}</p>
                  <p className="font-semibold mt-4">
                    {" "}
                    {isEnglish ? "Total" : "Totalt"} {studio.price}{" "}
                    {isEnglish ? "SEK / month" : "SEK / mån"}
                  </p>
                  <p>
                    {" "}
                    {isEnglish ? "Available from" : "Tillgänglig fr.om."}{" "}
                    {studio.availableFrom}
                  </p>
                  <NavLink to="/kontakt" className="self-end">
                    <button className="bg-lightRed text-darkRed rounded-4xl px-4 py-2 w-fit cursor-pointer">
                      {isEnglish ? "Interested?" : "Intresserad?"}
                    </button>
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        </>
      ) : (
        <img
          src={
            isLaptop
              ? pageData?.sections[0].h2LaptopImageUrl
              : pageData?.sections[0].h2MobileImageUrl
          }
          alt="våra ateljeer"
          className="laptop:max-w-[800px]"
        />
      )}
      <div className="laptop:max-w-[800px] flex flex-col gap-10 laptop:self-end">
        <img
          src={pageData?.sections[0].locationImageUrl}
          alt="planritning Hagsatra collective"
          className=""
        />
        <div className="flex flex-col gap-4">
          <h3 className="text-xl font-bold">
            {pageData?.sections[0]?.descriptionH3}
          </h3>
          <p className="">{pageData.sections[0].description}</p>
        </div>
      </div>
    </section>
  );
};
