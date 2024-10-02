import React from "react";
import "./GenderSelectItem.scss";
import { useTranslation } from "react-i18next";
import { RegisterProfileForm } from "../../core";

interface GenderSelectItemProps {
  form: Partial<RegisterProfileForm>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const GenderSelectItem: React.FC<GenderSelectItemProps> = ({
  form,
  handleInputChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="gender-group">
      <label className="gender-group--label">{t("gender.label")}</label>
      <label>
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={form.gender === "Male"}
          onChange={handleInputChange}
        />
        {t("gender.male")}
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={form.gender === "Female"}
          onChange={handleInputChange}
        />
        {t("gender.female")}
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="Other"
          checked={form.gender === "Other"}
          onChange={handleInputChange}
        />
        {t("gender.other")}
      </label>
    </div>
  );
};
