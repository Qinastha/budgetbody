import React, { useState } from "react";
import "./LanguageSwitcher.scss";
import { useTranslation } from "react-i18next";

export const LanguageSwitcher: React.FC = () => {
  const { i18n } = useTranslation();
  const [language, setLanguage] = useState(i18n.language);
  const [flipped, setFlipped] = useState(false);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setLanguage(lng);
    setFlipped(!flipped);
  };

  return (
    <div
      className="language-switcher"
      onClick={() => changeLanguage(language === "en" ? "ua" : "en")}>
      <div className={`flip-container ${flipped ? "flipped" : ""}`}>
        <div className="front">{language}</div>
        <div className="back">{language}</div>
      </div>
    </div>
  );
};
