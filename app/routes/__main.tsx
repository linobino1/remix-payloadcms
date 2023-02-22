import type { LoaderArgs } from "@remix-run/node";
import { Outlet, useLoaderData } from "@remix-run/react";
import type { ReactNode } from "react";
import Footer from "~/components/Footer";
import Header from "~/components/Header";
import classes from "./__main.module.css";

export const loader = async ({ context: { payload, user }}: LoaderArgs) => {
  const [site, navigations] = await Promise.all([
    payload.findGlobal({
      slug: 'site',
    }),
    payload.find({
      collection: 'navigations',
    }),
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

        <main>
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