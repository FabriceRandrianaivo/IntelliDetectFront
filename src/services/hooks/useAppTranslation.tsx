import { useTranslation } from "react-i18next";

export const useAppTranslation = () => {
  return useTranslation();
};

export const useBOTranslation = () => {
  const translationState = useTranslation();

  const t = (key: string, params?: object) => {
    return translationState.t(key, { ...params, ns: 'BO' });
    };

  return { ...translationState, t: t };
};
