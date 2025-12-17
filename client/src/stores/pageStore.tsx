import { create } from "zustand";

const STORAGE_KEY = "hc_intro_seen";

type ContactProps = {
 street: string
  postalCode: string
  city: string
  country: string
  location: {
    lat: number
    lng: number
  }
}

type PageState = {
  showIntro: boolean;
  hideIntro: () => void;
  contactData: ContactProps;
  updateContactData: (data: ContactProps) => void;
};

export const usePageStore = create<PageState>((set) => {
  const hasSeen = sessionStorage.getItem(STORAGE_KEY);

  return {
    showIntro: !hasSeen, // true om användaren inte sett den
    hideIntro: () => {
      sessionStorage.setItem(STORAGE_KEY, "true");
      set({ showIntro: false });
    },
     contactData: {
      street: '',
      postalCode: '',
      city: '',
      country: '',
      location: { lat: 0, lng: 0 },
    },
    updateContactData: (data: ContactProps) =>
      set({ contactData: data }),
  };
});
