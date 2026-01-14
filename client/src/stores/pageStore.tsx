import { create } from "zustand";

const STORAGE_KEY = "hc_intro_seen";

type AddressProps = {
  street: string;
  postalCode: string;
  city: string;
  country: string;
  location: {
    lat: number;
    lng: number;
  };
};
type ContactProps = {
  address: AddressProps;
  instagram: string;
  mail: string;
};

type PageState = {
  isEnglish: boolean;
  setEnglish: (value: boolean) => void;
  toggleLanguage: () => void;
  showIntro: boolean;
  hideIntro: () => void;
  contactData: ContactProps;
  updateContactData: (data: ContactProps) => void;
};

export const usePageStore = create<PageState>((set) => {
  const hasSeen = sessionStorage.getItem(STORAGE_KEY);

  return {
    showIntro: !hasSeen,
    isEnglish: false,
    setEnglish: (value) => set({ isEnglish: value }),
    toggleLanguage: () =>
      set((state) => ({
        isEnglish: !state.isEnglish,
      })),
    hideIntro: () => {
      sessionStorage.setItem(STORAGE_KEY, "true");
      set({ showIntro: false });
    },
    contactData: {
      address: {
        street: "",
        postalCode: "",
        city: "",
        country: "",
        location: { lat: 0, lng: 0 },
      },
      instagram: "",
      mail: "",
    },
    updateContactData: (data: ContactProps) => set({ contactData: data }),
  };
});
