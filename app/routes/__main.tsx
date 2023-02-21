import type { LoaderArgs } from "@remix-run/node";
import { Link, Outlet, useLoaderData } from "@remix-run/react";
import type { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import classes from "./__main.module.css";

export const loader = async ({ context: { payload, user }}: LoaderArgs) => {
  const site = await payload.findGlobal({
    slug: 'site',
  });
  const navigations = await payload.find({
    collection: 'navigations',
  });
  return {
    user,
    site,
    navigations: navigations.docs,
    lngs: {
      en: { nativeName: 'English' },
      de: { nativeName: 'Deutsch' }
    },
  };
}

export const handle = {
  i18n: ['common']
};

export type Props = {
  header: ReactNode
};

export default function Layout({
  header
}: Props) {
  const { user, site, navigations, lngs } = useLoaderData<typeof loader>();
  const { t, i18n } = useTranslation();

  return(
    <>
      <div className={classes.page}>
        <Header
          site={site}
          navigations={navigations}
          content={header} />

        <main className={classes.main}>
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
        </main>
      </div>

      <Footer
        site={site}
        navigations={navigations}
      />
    </>
  );
}