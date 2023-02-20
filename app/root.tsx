import type { MetaFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import RefreshAuthToken from "./util/refreshAuthToken";
import type { LoaderArgs } from "@remix-run/node";
import i18next from "~/i18next.server";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

export async function loader({ request }: LoaderArgs) {
  let locale = await i18next.getLocale(request);
  const t = await i18next.getFixedT(request, 'common')
  const siteTitle = t('siteTitle')
  return json({ locale, siteTitle }, {
    headers: {"Set-Cookie": await i18nCookie.serialize(locale)}
  })}

export const meta: MetaFunction = ({ data }) => ({
  charset: "utf-8",
  title: data.siteTitle,
  viewport: "width=device-width,initial-scale=1",
});

export const handle = {
  // In the handle export, we can add a i18n key with namespaces our route
  // will need to load. This key can be a single string or an array of strings.
  // TIP: In most cases, you should set this to your defaultNS from your i18n config
  // or if you did not set one, set it to the i18next default namespace "translation"
  i18n: "common",
};

export function useChangeLanguage(locale: string) {
  let { i18n } = useTranslation();
  useEffect(() => {
    i18n.changeLanguage(locale);
  }, [locale, i18n]);
}

export default function App() {
  // Get the locale from the loader
  let { locale } = useLoaderData<typeof loader>();
  let { i18n } = useTranslation();

  // This hook will change the i18n instance language to the current locale
  // detected by the loader, this way, when we do something to change the
  // language, this locale will change and i18next will load the correct
  // translation files
  useChangeLanguage(locale);

  return (
    <html lang={locale} dir={i18n.dir()}>
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Outlet />
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
        <RefreshAuthToken />
      </body>
    </html>
  );
}
