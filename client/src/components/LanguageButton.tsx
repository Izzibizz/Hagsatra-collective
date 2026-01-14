import { usePageStore } from "../stores/pageStore";

export const LanguageButton = () => {
  const { isEnglish, toggleLanguage } = usePageStore();

  return (
    <button
      onClick={toggleLanguage}
      className="fixed bottom-2 right-2 laptop:bottom-8 laptop:right-4 text-sm z-50 bg-darkRed text-lightRed rounded-full p-4 py-2 laptop:p-6 laptop:py-4 cursor-pointer hover:scale-110"
    >
      {isEnglish ? "SVENSKA" : "ENGLISH"}
    </button>
  );
};