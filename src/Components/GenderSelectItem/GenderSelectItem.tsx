import React from "react";
import "./GenderSelectItem.scss";
import { RegisterFormFields } from "../../core";

interface GenderSelectItemProps {
  form: RegisterFormFields;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const GenderSelectItem: React.FC<GenderSelectItemProps> = ({
  form,
  handleInputChange,
}) => {
  return (
    <div className="gender-group">
      <label className="gender-group--label">Gender</label>
      <label>
        <input
          type="radio"
          name="gender"
          value="Male"
          checked={form.gender === "Male"}
          onChange={handleInputChange}
        />
        Male
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="Female"
          checked={form.gender === "Female"}
          onChange={handleInputChange}
        />
        Female
      </label>
      <label>
        <input
          type="radio"
          name="gender"
          value="Other"
          checked={form.gender === "Other"}
          onChange={handleInputChange}
        />
        Other
      </label>
    </div>
  );
};
