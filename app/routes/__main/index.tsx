import { useTranslation } from "react-i18next";

export default function Index() {
  const { t } = useTranslation();


  return (
    <div>
      <h1>{t('Welcome')}</h1>
    </div>
  );
}
