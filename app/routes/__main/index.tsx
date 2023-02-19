import { useTranslation } from "react-i18next";

export default function Index() {
  let { t } = useTranslation();

  return (
    <div>
      <h1>{t('Welcome')}</h1>
    </div>
  );
}
