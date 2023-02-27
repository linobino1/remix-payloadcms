import type {
  Country,
  FilmPrint,
  Movie as MovieType,
  Director,
  Format,
  LanguageVersion,
  Poster as PosterType,
} from "payload/generated-types";
import React from "react";
import classes from './index.module.css';
import { Poster } from "~/components/Poster";

export type Props = {
  movie: MovieType
  filmprint?: FilmPrint
};

export const Movie: React.FC<Props> = ({ movie, filmprint }) => {
  const specs = [
    movie.originalTitle,
    (movie.country as Country[]).map((x) => x.name).join(', '),
    movie.year,
    (movie.directors as Director[]).map((x) => x.name).join(', '),
    filmprint ? (filmprint.format as Format).name : null,
    filmprint ? `${filmprint.duration}m` : null,
    filmprint ? (filmprint.languageVersion as LanguageVersion)?.name : null,
    filmprint ? filmprint.ageLimit : null,
  ].filter(Boolean);

  return (
    <div className={classes.movie}>
      <div className={classes.poster}>
        <Poster
          poster={movie.poster as PosterType}
          responsive={[
            {
              maxWidth: '(max-width: 2560px)',
              size: 'default',
            },
          ]}
        />
      </div>
      <div className={classes.movieInfo}>
        <h2 className={classes.movieTitle}>{movie.title}</h2>
        <div className={classes.movieSpecs}>
          { specs.map((spec, i) => (
            <div className={classes.movieSpecsItem} key={i}>{spec}</div>
          ))}
        </div>
        <div className={classes.synopsis}>{movie.synopsis}</div>
      </div>
    </div>

  );
};

export default Movie;