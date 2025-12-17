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
      className="bg-darkRed text-lightRed p-8 rounded-4xl"
    >
      <h3 className="font-hagsatra text-4xl">KONTAKTA OSS</h3>
      <div className="grid tablet:grid-cols-2">
        <div className="flex flex-col gap-6">
          {/* Förnamn */}
          <label htmlFor="firstName">Förnamn</label>
          <input id="firstName" type="text" name="firstName" required />
          <ValidationError
            prefix="Förnamn"
            field="firstName"
            errors={state.errors}
          />

          {/* Efternamn */}
          <label htmlFor="lastName">Efternamn</label>
          <input id="lastName" type="text" name="lastName" required />
          <ValidationError
            prefix="Efternamn"
            field="lastName"
            errors={state.errors}
          />

          {/* Email */}
          <label htmlFor="email">E-postadress</label>
          <input id="email" type="email" name="email" required />
          <ValidationError
            prefix="E-postadress"
            field="email"
            errors={state.errors}
          />
        </div>
        <div className="flex flex-col gap-6">
          {/* Konstnärlig praktik */}
          <label htmlFor="practice" className="flex flex-col gap-2">Konstnärlig praktik
          <input id="practice" type="text" name="practice" className="bg-lightRed text-darkRed rounded-4xl" />
          <ValidationError
            prefix="Konstnärlig praktik"
            field="practice"
            errors={state.errors}
          />
          </label>

          {/* Önskad ateljéstorlek */}
          <label htmlFor="studioSize">Önskad ateljéstorlek
          <select id="studioSize" name="studioSize" required>
            <option value="5kvm">Ca 5 kvm (ca 1383 kr/mån)</option>
            <option value="10kvm">Ca 10 kvm (ca 2515 kr/mån)</option>
            <option value="15kvm">Ca 15 kvm (ca 3648 kr/mån)</option>
            <option value="20+kcm">20 + kvm (ca 4780 kr +/mån)</option>
          </select>
          </label>
          <ValidationError
            prefix="Ateljéstorlek"
            field="studioSize"
            errors={state.errors}
          />
           {/* Kommentar */}
        <label htmlFor="comment" className="flex flex-col gap-2">Kommentar
        <textarea id="comment" name="comment" rows={5} className="bg-lightRed text-darkRed rounded-4xl" />
        <ValidationError
          prefix="Kommentar"
          field="comment"
          errors={state.errors}
        />
        </label>
        <input type="text" name="_gotcha" style={{ display: "none" }} />
        </div>
        <button type="submit" disabled={state.submitting}>
          Skicka
        </button>
      </div>
    </form>
  );
};
