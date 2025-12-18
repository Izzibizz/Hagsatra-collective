import { ContactForm } from "../components/ContactForm"
import { usePageStore } from "../stores/pageStore"
import mail from "/mail.png"
import instagram from "/instagram.png"

export const ContactPage: React.FC = () => {

  const contactData = usePageStore((state) => state.contactData)

  console.log(contactData)

  return (
    <section className="w-11/12 laptop:9/12 mx-auto mt-6 mb-4 tablet:mt-24 flex flex-col laptop:flex-row gap-10">
      <h2 className="text-3xl">Kontakt</h2>
      <div className="flex flex-col gap-10 justify-between px-6 tablet:grid grid-cols-2">
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
      <ContactForm />
    </section>
  )
}
