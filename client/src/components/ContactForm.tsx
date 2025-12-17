import React from "react";
import { useForm, ValidationError } from "@formspree/react";

export const ContactForm: React.FC = () => {
  const [state, handleSubmit] = useForm("xjknndwn");
  if (state.succeeded) {
    return <p>Thanks for joining!</p>;
  }
  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-darkRed text-lightRed p-8 rounded-4xl flex flex-col gap-10 laptop:max-w-[1000px]"
    >
      <h3 className="font-hagsatra text-4xl">KONTAKTA OSS</h3>
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
          {/* Konstnärlig praktik */}
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
        </div>
        <div className="flex flex-col gap-6">
          {/* Önskad ateljéstorlek */}
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
              className="bg-lightRed text-darkRed rounded-4xl"
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
    </form>
  );
};
