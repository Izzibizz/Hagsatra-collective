import { useState } from "react";
import { useForm, ValidationError } from "@formspree/react";
import { Check } from "lucide-react";

export const ContactForm: React.FC = () => {
  const [state, handleSubmit] = useForm("xjknndwn");
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  console.log(isChecked)

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-darkRed text-lightRed p-8 rounded-4xl flex flex-col gap-10 laptop:max-w-[1000px]"
    >
      <h3 className="font-hagsatra text-4xl text-center tablet:text-start">KONTAKTA OSS</h3>
      {state.succeeded ? (
        <div className="laptop:w-1/2 mx-auto flex flex-col justify-center">
          <p>
            Tack för ditt mail! Vi är en ideell förening och gör vårt bästa att
            återkomma så snart vi kan.
          </p>
        </div>
      ) : (
        <div className="grid tablet:grid-cols-2 gap-4 tablet:gap-10">
          <div className="flex flex-col gap-6">
            {/* Förnamn */}
            <label htmlFor="firstName" className="flex flex-col gap-2">
              Förnamn
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
              Efternamn
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
              E-postadress
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

              <span>Vill du hyra ateljé?</span>
            </label>
            
            {/* Konstnärlig praktik */}
            {isChecked && (
            <label htmlFor="practice" className="flex flex-col gap-2">
              Konstnärlig praktik
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
              Önskad ateljéstorlek
              <select
                id="studioSize"
                name="studioSize"
                className="bg-lightRed text-darkRed rounded-4xl p-1 px-2"
                required
              >
                <option value="">välj..</option>
                <option value="5kvm">Ca 5 kvm (ca 1383 kr/mån)</option>
                <option value="10kvm">Ca 10 kvm (ca 2515 kr/mån)</option>
                <option value="15kvm">Ca 15 kvm (ca 3648 kr/mån)</option>
                <option value="20+kcm">20 + kvm (ca 4780 kr +/mån)</option>
              </select>
              Priser är inkl. moms och medlemsavgift
            </label>
            )}
            <ValidationError
              prefix="Ateljéstorlek"
              field="studioSize"
              errors={state.errors}
            />
            
            {/* Kommentar */}
            <label htmlFor="comment" className="flex flex-col gap-2">
              Kommentar
              <textarea
                id="comment"
                name="comment"
                rows={5}
                className="bg-lightRed text-darkRed rounded-4xl px-4 py-2"
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
              Skicka
            </button>
          </div>
        </div>
      )}
    </form>
  );
};
