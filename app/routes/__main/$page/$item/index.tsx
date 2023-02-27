import type { LoaderArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import type {
  FilmPrint,
  Movie as MovieType,
  ScreeningGroup,
  Location,
  Poster as PosterType,
  FilmStill as FilmStillType,
} from "payload/generated-types";
import { Movie } from "~/components/Movie";
import classes from "./index.module.css";
import { Date } from "~/components/Date";
import i18next from "~/i18next.server";
import { useTranslation } from "react-i18next";
import Poster from "~/components/Poster";
import FilmStill from "~/components/FilmStill";

export const loader = async ({ params, request, context: { payload }}: LoaderArgs) => {
  const data = await payload.find({
    collection: 'screenings',
    where: {
      slug: {
        equals: params.item,
      },
    },
    locale: await i18next.getLocale(request),
    depth: 11,
  });
  
  return {
    screening: data.docs[0],
  }
}

export const meta: MetaFunction<typeof loader> = ({ data }) => {
  return {
    title: data.screening.title,
  }
};

export default function Item() {
  const { screening } = useLoaderData<typeof loader>();
  const mainMovie = (screening.featureFilms[0] as FilmPrint).movie as MovieType;
  const featureFilms = (screening.featureFilms as FilmPrint[]) ?? [];
  const supportingFilms = (screening.supportingFilms as FilmPrint[]) ?? [];
  const { t } = useTranslation();


  return (
    <>
      <h1 className={classes.title}>
        <span>{(screening.group as ScreeningGroup).name}</span>
        <span className={classes.subtitle}>{screening.title}</span>
      </h1>
      <div className={classes.imageHeader}>
        <FilmStill
          className={classes.headerImage}
          filmstill={mainMovie.filmStill as FilmStillType}
          responsive={[
            {
              maxWidth: '(max-width: 320px)',
              size: '320w',
            },
            {
              maxWidth: '(max-width: 768px)',
              size: '768w',
            },
            {
              maxWidth: '(max-width: 1024px)',
              size: '1024w',
            },
            {
              maxWidth: '(max-width: 1920px)',
              size: '1920w',
            },
            {
              maxWidth: '(max-width: 2560px)',
              size: '2560w',
            },
          ]}
        />
        <div className={classes.imageHeaderOverlay}>
          <div className={classes.imageHeaderOverlayContent}>
            <div className={classes.posters}>
              { (screening.featureFilms as FilmPrint[]).map((filmprint) => (
                <div key={filmprint.id} className={classes.poster}>
                  <Poster
                    poster={(filmprint.movie as MovieType).poster as PosterType}
                    responsive={[
                      {
                        maxWidth: '(max-width: 2560px)',
                        size: 'default',  // we'll load this anyway
                      },
                    ]}
                  />
                </div>
              ))}
            </div>
            <div className={classes.infoTitle}>
              <Date
                className={classes.date}
                iso={screening.date as string}
                format="P"
              />
              <br />
              <Date
                className={classes.time}
                iso={screening.time as string}
                format="p"
              />
              <br />
              <div className={classes.location}>{(screening.location as Location).name}</div>
              { supportingFilms.map((filmprint) => (
                <div key={filmprint.id} className={classes.movieTitle}>
                  {(filmprint.movie as MovieType).title}
                </div>
              ))}
              { featureFilms.map((filmprint) => (
                <div key={filmprint.id} className={classes.movieTitle}>
                  {(filmprint.movie as MovieType).title}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <main>
        <div className={classes.movies}>
          { (screening.featureFilms as FilmPrint[]).map((filmprint) => (
            <div key={filmprint.id}>
              <Movie
                movie={filmprint.movie as MovieType}
                filmprint={filmprint}
              />
              <hr />
            </div>
          ))}
          { screening.guest && (
            <div className={classes.discussion}>
              { t('Film talk with {{guests}} moderated by {{moderator}}', {
                guests: screening.guest,
                moderator: screening.moderator,
              })}
            </div>
          )}
        </div>
      </main>
    </>
  );
}