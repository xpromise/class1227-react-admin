import { CHANGE_LANGUAGE } from "../constants/lang";

export const changeLanguageSync = (lang) => ({
  type: CHANGE_LANGUAGE,
  data: lang,
});
