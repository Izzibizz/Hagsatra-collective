import { ContactForm } from "../components/ContactForm";
import { usePageStore } from "../stores/pageStore";
import mail from "/mail.png";
import instagram from "/instagram.png";

export const ContactPage: React.FC = () => {
  const contactData = usePageStore((state) => state.contactData);
  const isEnglish = usePageStore((state) => state.isEnglish);

  console.log(contactData);

  if (!contactData) {
    return <div className="min-h-screen" />;
  }

  return (
    <section className="animate-fadeIn w-11/12 laptop:max-w-[1000px] mx-auto mt-6 mb-4 tablet:mt-10 laptop:mt-24 flex flex-col laptop:flex-row gap-10 laptop:gap-20">
      <div className="flex flex-col gap-16 px-6 tablet:grid grid-cols-2 laptop:flex">
        <div className="flex flex-col gap-6">
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
        </div>
        <div className="flex flex-col">
          <h4 className="font-bold">
            {isEnglish ? "Address" : "Besöksadress"}
          </h4>
          <p className="">{contactData.address.street}</p>
          <p className="">
            {contactData.address.postalCode} {contactData.address.city}
          </p>
        </div>
      </div>
      <ContactForm />
    </section>
  );
};
