import { sanity } from "../library/SanityClient";
import { useEffect, useState } from "react";
import { useIsLaptop } from "../hooks/IsLaptop";
import type { PortableTextBlock } from "@portabletext/types";
import { PortableText } from "@portabletext/react";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

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

  const handleShowMore = () => {
    setShowmore(!showMore);
  };

  const query = `
*[_type == "page" && slug.current == "about"][0]{
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
  }, []);

  console.log(aboutData);
  return (
    <section className="w-11/12 laptop:w-9/12 mx-auto mt-10 laptop:mt-18 flex flex-col gap-14">
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
          showMore ? "p-8 w-full tablet:w-fit laptop:min-w-[400px]" : " py-3 px-4 w-fit"
        } flex flex-col gap-8`}
      >
        <button
          className={`self-start cursor-pointer flex items-center gap-2 ${
            showMore ? "underline text-lg" : ""
          }`}
          onClick={() => handleShowMore()}
        >
          Lista med medlemmar {showMore ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </button>
        {showMore && (
          <ul className="flex flex-col gap-4 list-disc pl-6">
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
      <div className="flex flex-col tablet:flex-row gap-8">
        <img
          src={aboutData?.activities.images[0].image}
          className=" tablet:w-1/2 aspect-[3/2] object-cover"
          alt="aktivitet"
        />
        <img
          src={aboutData?.activities.images[1].image}
          className="tablet:w-1/2 aspect-[3/2] object-cover tablet:max-w-[400px] laptop:max-w-[500px]"
          alt="aktivitet"
        />
      </div>
    </section>
  );
};
