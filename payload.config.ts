import { buildConfig } from "payload/config";
import path from "path";
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
import Rightholders from './cms/collections/FilmPrints/Rightholders';
import SoundFormats from './cms/collections/FilmPrints/SoundFormats';
import Movies from './cms/collections/Movies';
import Actors from './cms/collections/Movies/Actors';
import Directors from './cms/collections/Movies/Directors';
import Genres from './cms/collections/Movies/Genres';
import Languages from './cms/collections/Movies/Languages';
import Series from './cms/collections/Movies/Series';
import FilmPrintTypes from './cms/collections/FilmPrints/FilmPrintTypes';
import Countries from './cms/collections/Movies/Countries';
import Site from './cms/globals/Site';
import ScreeningTypes from './cms/collections/Screenings/ScreeningTypes';
import Locations from './cms/collections/Screenings/Locations';
import ScreeningSeries from './cms/collections/Screenings/ScreeningSeries';

export default buildConfig({
  serverURL: "http://localhost:3000",
  admin: {
    user: Users.slug,
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
    ScreeningTypes,
    Locations,
    ScreeningSeries,

    // FilmPrints
    FilmPrints,
    FilmPrintTypes,
    AspectRatios,
    Carriers,
    Conditions,
    Formats,
    Rightholders,
    SoundFormats,

    // Movies
    Movies,
    Actors,
    Directors,
    Genres,
    Countries,
    Languages,
    Series,

  ],
  globals: [
    Site,
  ],
  typescript: {
    outputFile: path.resolve(__dirname, "app/payload-types.ts"),
   }
});
