import { create } from "zustand";

const STORAGE_KEY = "hc_intro_seen";

type PageState = {
  showIntro: boolean;
  hideIntro: () => void;
};

export const usePageStore = create<PageState>((set) => {
  const hasSeen = sessionStorage.getItem(STORAGE_KEY);

  return {
    showIntro: !hasSeen, // true om användaren inte sett den
    hideIntro: () => {
      sessionStorage.setItem(STORAGE_KEY, "true");
      set({ showIntro: false });
    },
  };
});
