import { useEffect } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { sanity } from "../library/SanityClient";
import { useLocation } from "react-router";
import { usePageStore } from "../stores/pageStore";
import mail from "/mail.png";
import instagram from "/instagram.png";

export const Footer: React.FC = () => {
  const contactData = usePageStore((state) => state.contactData);
  const updateContactData = usePageStore((state) => state.updateContactData);
  const location = useLocation();
  const showContactInfo = location.pathname !== "/kontakt";
  const isEnglish = usePageStore((state) => state.isEnglish);

  useEffect(() => {
    const slug = isEnglish ? "contactEng" : "contact";
    sanity
      .fetch(
        `*[_type == "page" && slug.current == "${slug}"][0]
        .sections[_type == "contactBlock"][0]{
        address,
       mail,
       instagram
        }`
      )
      .then((res) => {
        if (res?.address) {
          updateContactData(res);
        }
      });
  }, [updateContactData, isEnglish]);

  console.log(contactData);
  return (
    <footer className="flex flex-col gap-10 w-screen h-fit p-2 laptop:px-6 font-sans text-darkRed">
      {showContactInfo && (
        <div className="flex flex-col tablet:flex-row tablet:justify-between laptop:w-2/3 laptop:max-w-[800px] tablet:mx-auto gap-8 px-6">
          <a
            href={contactData.instagram}
            rel="noopener noreferer"
            target="_blank"
            className="flex items-center gap-4"
          >
            <img src={instagram} className="w-[30px]" alt="mail" />
            @hagsatracollective
          </a>
          <a
            href={`mailto:${contactData.mail}`}
            className="flex items-center gap-4"
          >
            <img src={mail} className="w-[30px]" alt="mail" />
            {contactData.mail}
          </a>
          <div className="flex flex-col">
            <h4>{isEnglish ? "Address" : "Besöksadress"}</h4>
            <p className="text-sm">{contactData.address.street}</p>
            <p className="text-sm">
              {contactData.address.postalCode} {contactData.address.city}
            </p>
          </div>
        </div>
      )}
      <div className="flex justify-between px-6">
        <a
          href="http://linnbredberg.com"
          className="relative max-w-1/2 tablet:max-w-full flex gap-2 items-center text-[9px] after:content-[''] after:block after:w-0 after:h-[1px] after:bg-stone-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
        >
          {" "}
          <MdOutlineArrowOutward />
         {isEnglish ? "Graphic design" : "Grafisk formgivning"} | Linn Bredberg
        </a>
        <p className="text-[11px] font-body hidden laptop:block">
          © Hagsätra Collective 2026 | All Rights Reserved
        </p>
        <a
          href="http://izabellind.com"
          className="relative max-w-1/2 tablet:max-w-full flex gap-2 items-center text-[9px] after:content-[''] after:block after:w-0 after:h-[1px] after:bg-stone-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
        >
          {" "}
          <MdOutlineArrowOutward />
          Design & webdevelopment | Izabel Lind itFlows
        </a>
      </div>
      <p className="text-[10px] font-body laptop:hidden text-center">
        © Hagsätra Collective 2026
      </p>
    </footer>
  );
};
