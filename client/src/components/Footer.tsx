import { useEffect } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";
import { sanity } from "../library/SanityClient";
import { usePageStore } from "../stores/pageStore";

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
          updateContactData(res.address);
        }
      });
  }, [updateContactData]);

  console.log(contactData);
  return (
    <footer className="absolute bottom-0 left-0 flex flex-col w-screen h-fit p-2 laptop:px-6 font-sans text-darkRed">
      <div className="flex flex-col">
        <h4>Adress</h4>
        <p>{contactData.street}</p>
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
