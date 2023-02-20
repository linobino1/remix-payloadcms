import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import styles from "./__main.module.css";

export const loader = ({ context: { user }}: LoaderArgs) => {
  return json({
    user,
    lngs: {
      en: { nativeName: 'English' },
      de: { nativeName: 'Deutsch' }
    },
  });
}

export const handle = {
  i18n: ['common']
};

export default function Layout() {
  const data = useLoaderData<typeof loader>();
  const { user, lngs } = data;
  const { t, i18n } = useTranslation();

  return (
    <>
      <div className={styles.main}>
        <nav>
          {(Object.keys(lngs) as Array<keyof typeof lngs>).map((lng) => (
            <Link
              key={lng}
              style={{ fontWeight: i18n.language === lng ? 'bold' : 'normal' }}
              to={`/?lng=${lng}`}
            >
              {lngs[lng].nativeName}
            </Link>
          ))}
          { user ? (
            <>
              {user?.email}<br />
              <Link to="/auth/me">my account</Link>
            </>
          ) : (
            <Link to="/auth/signin">{t('sign in')}</Link>
          )}
        </nav>
        <Outlet />
      </div>
    </>
  );
}