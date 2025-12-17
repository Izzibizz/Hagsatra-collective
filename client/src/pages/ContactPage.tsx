import { ContactForm } from "../components/ContactForm"

export const ContactPage: React.FC = () => {
  return (
    <section className="w-11/12 laptop:9/12 mx-auto mt-24">
      <h2>Kontakt</h2>
      <ContactForm />
    </section>
  )
}
