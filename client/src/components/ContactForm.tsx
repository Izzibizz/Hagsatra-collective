import React from 'react';
import { useForm, ValidationError } from '@formspree/react';

export const ContactForm: React.FC = () => {
  const [state, handleSubmit] = useForm("xjknndwn");
  if (state.succeeded) {
      return <p>Thanks for joining!</p>;
  }
  return (
        <form onSubmit={handleSubmit} noValidate>
      {/* Förnamn */}
      <label htmlFor="firstName">Förnamn</label>
      <input
        id="firstName"
        type="text"
        name="firstName"
        required
      />
      <ValidationError
        prefix="Förnamn"
        field="firstName"
        errors={state.errors}
      />

      {/* Efternamn */}
      <label htmlFor="lastName">Efternamn</label>
      <input
        id="lastName"
        type="text"
        name="lastName"
        required
      />
      <ValidationError
        prefix="Efternamn"
        field="lastName"
        errors={state.errors}
      />

      {/* Email */}
      <label htmlFor="email">E-postadress</label>
      <input
        id="email"
        type="email"
        name="email"
        required
      />
      <ValidationError
        prefix="E-postadress"
        field="email"
        errors={state.errors}
      />

      {/* Konstnärlig praktik */}
      <label htmlFor="practice">Konstnärlig praktik</label>
      <input
        id="practice"
        type="text"
        name="practice"
      />
      <ValidationError
        prefix="Konstnärlig praktik"
        field="practice"
        errors={state.errors}
      />

      {/* Önskad ateljéstorlek */}
      <label htmlFor="studioSize">Önskad ateljéstorlek</label>
      <select
        id="studioSize"
        name="studioSize"
        required
      >
        <option value="">Välj storlek</option>
        <option value="liten">Liten</option>
        <option value="mellan">Mellan</option>
        <option value="stor">Stor</option>
      </select>
      <ValidationError
        prefix="Ateljéstorlek"
        field="studioSize"
        errors={state.errors}
      />

      {/* Kommentar */}
      <label htmlFor="comment">Kommentar</label>
      <textarea
        id="comment"
        name="comment"
        rows={5}
      />
      <ValidationError
        prefix="Kommentar"
        field="comment"
        errors={state.errors}
      />
      <input type="text" name="_gotcha" style={{ display: 'none' }} />

      <button type="submit" disabled={state.submitting}>
        Skicka
      </button>
    </form>
  );
}