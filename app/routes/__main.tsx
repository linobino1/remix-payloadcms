import type { LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import type { ReactNode } from "react";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import i18next from "~/i18next.server";
import classes from "./__main.module.css";

export const loader = async ({ request, context: { payload, user }}: LoaderArgs) => {
  const locale = await i18next.getLocale(request);

  const [site, navigations] = await Promise.all([
    payload.findGlobal({
      slug: 'site',
    }),
    fetch(`http://localhost:3000/api/navigations?locale=${locale}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then((res) => res.json()),

    // local API is not returning localized fields in correct locale...
    // payload.find({
    //   collection: 'navigations',
    // }),
    // locale,
  ]);
  return {
    user,
    site,
    navigations: navigations.docs,
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
  const { site, navigations } = useLoaderData<typeof loader>();

  return (
    <>
      <div className={classes.page}>
        <Header
          site={site}
          navigations={navigations}
          content={header} />

        <Outlet />
      </div>

      <Footer
        site={site}
        navigations={navigations}
      />
    </>
  );
}