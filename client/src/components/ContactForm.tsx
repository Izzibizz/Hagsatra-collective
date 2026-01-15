import { useState, useEffect } from "react";
import { sanity } from "../library/SanityClient";
import { useForm, ValidationError } from "@formspree/react";
import { Check } from "lucide-react";
import { usePageStore } from "../stores/pageStore";

export type AvailableStudio = {
  name: string;
  size?: number;
  image?: string;
  description?: string;
  price?: number;
  availableFrom?: string;
};

export type StudiosBlock = {
  _type: "studiosBlock";
  imageUrl: string;
  h2LaptopImageUrl: string;
  h2MobileImageUrl: string;
  h2AvailableLaptopImageUrl: string;
  h2AvailableMobileImageUrl: string;
  locationImageUrl: string;
  description: string;
  availability: "yes" | "no";
  availableStudios?: AvailableStudio[];
};

type StudioPageData = {
  title: string;
  sections: StudiosBlock[];
};

export const ContactForm: React.FC = () => {
  const [state, handleSubmit] = useForm("xjknndwn");
  const [isChecked, setIsChecked] = useState(false);
  const [studioData, setStudioData] = useState<StudioPageData | null>(null);
  const isEnglish = usePageStore((state) => state.isEnglish);
  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const studiosBlock = studioData?.sections.find(
    (section) => section._type === "studiosBlock"
  );

  const hasAvailableStudios =
    studiosBlock?.availability === "yes" &&
    studiosBlock?.availableStudios &&
    studiosBlock.availableStudios.length > 0;

  useEffect(() => {
    const slug = isEnglish ? "studioEng" : "studio";
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
        setStudioData(data);
      });
  }, [isEnglish]);

  console.log(isChecked);

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-darkRed text-lightRed p-8 rounded-4xl flex flex-col gap-10 tablet:w-[90vw] laptop:min-w-[600px] laptop:w-[800px] tablet:self-center"
    >
      <h3 className="text-4xl text-center tablet:text-start">
        {isEnglish ? "Get in touch" : "Kontakta oss"}
      </h3>
      {state.succeeded ? (
        <div className="laptop:w-2/3 flex flex-col ">
          <p>
            {isEnglish
              ? "Thanks for your email! We are a non-profit association and we'll do our best to get back to you ASAP"
              : "Tack för ditt mail! Vi är en ideell förening och gör vårt bästa att återkomma så snart vi kan."}
          </p>
        </div>
      ) : (
        <div className="grid tablet:grid-cols-2 gap-4 tablet:gap-10">
          <div className="flex flex-col gap-6">
            {/* Förnamn */}
            <label htmlFor="firstName" className="flex flex-col gap-2">
              {isEnglish ? "First name" : "Förnamn"}
              <input
                id="firstName"
                type="text"
                name="firstName"
                className="bg-lightRed text-darkRed rounded-4xl p-1 px-2"
                required
              />
              <ValidationError
                prefix="Förnamn"
                field="firstName"
                errors={state.errors}
              />
            </label>

            {/* Efternamn */}
            <label htmlFor="lastName" className="flex flex-col gap-2">
              {isEnglish ? "Last name" : "Efternamn"}
              <input
                id="lastName"
                type="text"
                name="lastName"
                className="bg-lightRed text-darkRed rounded-4xl p-1 px-2"
                required
              />
              <ValidationError
                prefix="Efternamn"
                field="lastName"
                errors={state.errors}
              />
            </label>

            {/* Email */}
            <label htmlFor="email" className="flex flex-col gap-2">
              {isEnglish ? "Email" : "E-postadress"}
              <input
                id="email"
                type="email"
                name="email"
                className="bg-lightRed text-darkRed rounded-4xl p-1 px-2"
                required
              />
              <ValidationError
                prefix="E-postadress"
                field="email"
                errors={state.errors}
              />
            </label>
            <label className="flex items-center gap-3 cursor-pointer">
              {/* RIKTIG checkbox (osynlig men funktionell) */}
              <input
                type="checkbox"
                name="renting"
                checked={isChecked}
                onChange={handleCheckboxChange}
                className="hidden"
              />

              {/* VISUELL checkbox */}
              <div
                className={`w-5 h-5 rounded-sm border border-lightRed flex items-center justify-center
      ${isChecked ? "bg-lightRed" : "bg-transparent"}
    `}
              >
                {isChecked && <Check size={14} className="text-darkRed" />}
              </div>

              <span>
                {" "}
                {isEnglish
                  ? "Interested in renting a studio?"
                  : "Vill du hyra ateljé?"}
              </span>
            </label>
            {isChecked && hasAvailableStudios && (
              <div className="flex flex-col gap-4">
                <p className="font-semibold">
                  {isEnglish ? "Available now, interested?" : "Ledigt just nu, intresserad?"}
                </p>

                {studiosBlock!.availableStudios!.map((studio, index) => (
                  <label
                    key={index}
                    className="flex items-center gap-3 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name="selectedStudios"
                      value={studio.name}
                      className="hidden peer"
                    />

                    {/* Visuell checkbox */}
                    <div className="w-5 h-5 border border-lightRed rounded-sm flex items-center justify-center peer-checked:bg-lightRed">
                      <Check
                        size={14}
                        className="text-darkRed peer-checked:opacity-100"
                      />
                    </div>

                    <span>
                      {studio.name}
                      {studio.size && ` – ${studio.size} kvm`}
                      {studio.price && ` (${studio.price} kr/mån)`}
                    </span>
                  </label>
                ))}
              </div>
            )}

            {/* Konstnärlig praktik */}
            {isChecked && (
              <label htmlFor="practice" className="flex flex-col gap-2">
                {isEnglish ? "Artistic practice" : "Konstnärlig praktik"}
                <input
                  id="practice"
                  type="text"
                  name="practice"
                  className="bg-lightRed text-darkRed rounded-4xl p-1 px-2"
                />
                <ValidationError
                  prefix="Konstnärlig praktik"
                  field="practice"
                  errors={state.errors}
                />
              </label>
            )}
          </div>
          <div className="flex flex-col gap-6">
            {/* Önskad ateljéstorlek */}
            {isChecked && (
              <label htmlFor="studioSize" className="flex flex-col gap-2">
                {isEnglish
                  ? "Preffered studio size/price"
                  : "Önskad ateljéstorlek/pris"}
                <select
                  id="studioSize"
                  name="studioSize"
                  className="bg-lightRed text-darkRed rounded-4xl p-1 px-2"
                  required
                >
                  <option value=""> {isEnglish ? "Choose.." : "välj.."}</option>
                  <option value="5kvm">
                    {isEnglish
                      ? "Approx. 5 sqm (approx. 1383 SEK/month)"
                      : "Ca 5 kvm (ca 1383 kr/mån)"}
                  </option>
                  <option value="10kvm">
                    {isEnglish
                      ? "Approx. 10 sqm (approx. 2515 SEK/month)"
                      : "Ca 10 kvm (ca 2515 kr/mån)"}
                  </option>
                  <option value="15kvm">
                    {isEnglish
                      ? "Approx. 15 sqm (approx. 3648 SEK/month)"
                      : "Ca 15 kvm (ca 3648 kr/mån)"}
                  </option>
                  <option value="20+kcm">
                    {isEnglish
                      ? "20+ sqm (approx. 4780 SEK+/month)"
                      : "20+ kvm (ca 4780 kr+/mån)"}
                  </option>
                </select>
                {isEnglish
                  ? "Prices are inc. VAT and membership fee"
                  : "Priser är inkl. moms och medlemsavgift"}
              </label>
            )}
            <ValidationError
              prefix="Ateljéstorlek"
              field="studioSize"
              errors={state.errors}
            />

            {/* Kommentar */}
            <label htmlFor="comment" className="flex flex-col gap-2">
              {isEnglish ? "Comment" : "Kommentar"}
              <textarea
                id="comment"
                name="comment"
                rows={5}
                className="bg-lightRed text-darkRed rounded-4xl px-4 py-2 resize-none overflow-auto scrollbar-none"
              />
              <ValidationError
                prefix="Kommentar"
                field="comment"
                errors={state.errors}
              />
            </label>
            <input type="text" name="_gotcha" style={{ display: "none" }} />
            <button
              type="submit"
              disabled={state.submitting}
              className="bg-lightRed hover:bg-white text-darkRed w-fit px-8 py-2 self-end rounded-4xl"
            >
              {isEnglish ? "Send" : "Skicka"}
            </button>
          </div>
        </div>
      )}
    </form>
  );
};
