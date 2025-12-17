import { useEffect } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { sanity } from "../library/SanityClient";
import { usePageStore } from "../stores/pageStore";
import mail from "/mail.png";
import instagram from "/instagram.png"

export const Footer: React.FC = () => {
  const contactData = usePageStore((state) => state.contactData);
  const updateContactData = usePageStore((state) => state.updateContactData);

  useEffect(() => {
    sanity
      .fetch(
        `*[_type == "page" && slug.current == "contact"][0]
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
  }, [updateContactData]);

  console.log(contactData);
  return (
    <footer className="absolute bottom-0 left-0 flex flex-col gap-4 w-screen h-fit p-2 laptop:px-6 font-sans text-darkRed">
      <div className="flex justify-between px-6">
        <div className="flex flex-col gap-6">
          <a
            href={contactData.instagram} rel="noopener noreferer" target="_blank"
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
        </div>
        <div className="flex flex-col">
          <h4>Besöksadress</h4>
          <p className="text-sm">{contactData.address.street}</p>
          <p className="text-sm">
            {contactData.address.postalCode} {contactData.address.city}
          </p>
        </div>
      </div>
      <div className="flex justify-between">
        <a
          href="http://izabellind.com"
          className="relative max-w-1/2 tablet:max-w-full flex gap-2 items-center text-[9px] after:content-[''] after:block after:w-0 after:h-[1px] after:bg-stone-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
        >
          {" "}
          <MdOutlineArrowOutward />
          Design & webdevelopment | Izabel Lind itFlows
        </a>
        <p className="text-[11px] font-body hidden laptop:block">
          © Hagsätra Collective 2026 | All Rights Reserved
        </p>
        <a
          href="http://linnbredberg.com"
          className="relative max-w-1/2 tablet:max-w-full flex gap-2 items-center text-[9px] after:content-[''] after:block after:w-0 after:h-[1px] after:bg-stone-500 after:absolute after:left-0 after:bottom-0 after:transition-all after:duration-300 hover:after:w-full"
        >
          {" "}
          <MdOutlineArrowOutward />
          Grafisk form | Linn Bredberg
        </a>
      </div>
      <p className="text-[10px] font-body laptop:hidden text-center">
        © Hagsätra Collective 2026
      </p>
    </footer>
  );
};
