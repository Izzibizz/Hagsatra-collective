import { Helmet } from "react-helmet";

export const HomeHelmet: React.FC = () => (
  <Helmet>
    <title>Hagsätra Collective – Konstnärsateljéer, utställningar & kreativa workshops</title>
    <meta name="description" content="Vi är förening med lokal i Hagsätra, som erbjuder konstnärer i Stockholm att bli medlem och hyra ateljé. Vi orgaiserar utställningar och öppna kreativa workshops för barn och vuxna." />
    <link rel="icon" type="image/png" sizes="180x180" href="/HC-Logotyp-monogram-80.png" />
  </Helmet>
);
