import { sanity } from "../library/SanityClient";
import { useEffect, useState, useRef } from "react";
import { useIsLaptop } from "../hooks/IsLaptop";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText } from "@portabletext/react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";
import { usePageStore } from "../stores/pageStore";

type Member = {
  name: string;
  role?: string;
  link?: string;
};

type AboutData = {
  H2: string;
  IntroText: string;
  historyText: string;
  titleImage: string;
  thanksTo: PortableTextBlock[];
  members?: Member[];
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
  const [showMore, setShowmore] = useState(false);
  const isEnglish = usePageStore((state) => state.isEnglish);
  const listRef = useRef<HTMLUListElement | null>(null);

  const handleShowMore = () => {
    setShowmore(!showMore);
  };

  const slug = isEnglish ? "aboutEng" : "about";

  const query = `
*[_type == "page" && slug.current == "${slug}"][0]{
  sections[_type == "aboutBlock"][0]{
    H2,
    IntroText,
    historyText,
    titleImage,
    thanksTo,
    members,

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
  }, [isEnglish]);

  useEffect(() => {
    if (showMore) {
      listRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [showMore]);

  console.log(aboutData);

  if (!aboutData) {
    return <div className="min-h-screen" />;
  }

  return (
    <section className="animate-fadeIn w-11/12 laptop:w-9/12 mx-auto mt-10 laptop:mt-18 flex flex-col gap-14">
      <div className="flex justify-between">
        <div className="flex flex-col gap-8">
          <img
            src={aboutData?.titleImage}
            className="tablet:w-1/2 object-cover"
            alt="Vilka är vi?"
          />
          <p className="laptop:w-2/3">{aboutData?.IntroText}</p>
          <p className="laptop:w-2/3">{aboutData?.historyText}</p>
        </div>
        {isLaptop && (
          <img
            src={aboutData?.exhibitions.images[0].image}
            className="w-1/4 max-w-[500px] object-cover"
          />
        )}
      </div>
      {!isLaptop && (
        <img
          src={aboutData?.exhibitions.images[0].image}
          className="tablet:w-1/2 object-cover"
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
      <div
        className={`border border-darkRed rounded-4xl ${
          showMore
            ? "p-8 w-full tablet:w-fit laptop:min-w-[400px]"
            : " py-3 px-4 w-fit"
        } flex flex-col gap-8`}
      >
        <button
          className={`self-start cursor-pointer flex items-center gap-2 ${
            showMore ? "underline text-lg" : ""
          }`}
          onClick={() => handleShowMore()}
        >
          {isEnglish ? "List of members" : "Lista med medemmar"}{" "}
          {showMore ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
        {showMore && (
          <ul className="flex flex-col gap-4 list-disc pl-6 scroll-mt-48" ref={listRef}>
            {aboutData?.members?.map((member, index) => (
              <li key={index}>
                {member.link ? (
                  <a
                    href={member.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:opacity-80"
                  >
                    {member.name}
                    {member.role && ` (${member.role})`}
                  </a>
                ) : (
                  <>
                    {member.name}
                    {member.role && ` (${member.role})`}
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
};
