import { useState } from "react";

const STORAGE_KEY = "hc_intro_seen";

export const useIntroOnce = () => {
  // Läser sessionStorage direkt vid init
  const [showIntro, setShowIntro] = useState(() => {
    const hasSeen = sessionStorage.getItem(STORAGE_KEY);
    if (!hasSeen) {
      sessionStorage.setItem(STORAGE_KEY, "true");
      return true;
    }
    return false;
  });

  return showIntro;
};
