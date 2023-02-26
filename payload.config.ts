import { buildConfig } from "payload/config";
import path from 'path';
import i18n from "./i18n";
import Media from './cms/collections/Media';
import Navigations from './cms/collections/Navigations';
import Posts from './cms/collections/Posts';
import Pages from './cms/collections/Pages';
import Users from './cms/collections/Users';
import Screenings from './cms/collections/Screenings';
import FilmPrints from './cms/collections/FilmPrints';
import AspectRatios from './cms/collections/FilmPrints/AspectRatios';
import Carriers from './cms/collections/FilmPrints/Carriers';
import Conditions from './cms/collections/FilmPrints/Conditions';
import Formats from './cms/collections/FilmPrints/Formats';
import SoundFormats from './cms/collections/FilmPrints/SoundFormats';
import Movies from './cms/collections/Movies';
import Actors from './cms/collections/Movies/Actors';
import Directors from './cms/collections/Movies/Directors';
import Genres from './cms/collections/Movies/Genres';
import Series from './cms/collections/Movies/Series';
import FilmPrintTypes from './cms/collections/FilmPrints/FilmPrintTypes';
import Countries from './cms/collections/Movies/Countries';
import Site from './cms/globals/Site';
import Locations from './cms/collections/Screenings/Locations';
import ScreeningSeries from './cms/collections/Screenings/ScreeningSeries';
import ScreeningGroups from './cms/collections/Screenings/ScreeningGroups';
import LanguageVersions from './cms/collections/FilmPrints/LanguageVersions';

export default buildConfig({
  serverURL: "http://localhost:3000",
  admin: {
    user: Users.slug,
  },
  i18n: {
    ...i18n,
  },
  collections: [
    // Site
    Users,
    Pages,
    Media,
    Navigations,

    // Blog
    Posts,

    // Screenings
    Screenings,
    ScreeningGroups,
    Locations,
    ScreeningSeries,

    // FilmPrints
    FilmPrints,
    FilmPrintTypes,
    AspectRatios,
    Carriers,
    Conditions,
    Formats,
    SoundFormats,
    LanguageVersions,

    // Movies
    Movies,
    Actors,
    Directors,
    Genres,
    Countries,
    Series,

  ],
  globals: [
    Site,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "cms/payload-types.ts"),
  },
  localization: {
    defaultLocale: i18n.fallbackLng,
    locales: i18n.supportedLngs,
    fallback: true,
  },
});
