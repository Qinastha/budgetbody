import i18n from "i18next";
import { initReactI18next } from "react-i18next/initReactI18next";

const resources = {
  en: {
    translation: {
      "button.cancel": "Cancel",
      "button.save": "Save",
      "button.edit": "Edit",
      "button.show": "Show",
      "button.delete": "Delete",
      "button.close": "Close",
      "button.submit": "Submit",
      "button.update": "Update",
    },
  },
  ua: {
    translation: {
      "button.cancel": "Скасувати",
      "button.save": "Зберегти",
      "button.edit": "Редагувати",
      "button.show": "Показати",
      "button.delete": "Видалити",
      "button.close": "Закрити",
      "button.submit": "Підтвердити",
      "button.update": "Оновити",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
