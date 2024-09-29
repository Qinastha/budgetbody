import React from "react";
import { useTranslation } from "react-i18next";

export const NotFound: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div>
      <h2>{t("notFound.title")}</h2>
      <p>{t("notFound.message")}</p>
    </div>
  );
};
