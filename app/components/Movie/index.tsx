import type { Media, Country, FilmPrint, Movie as MovieType, Director, Format, LanguageVersion } from "payload/generated-types";
import React from "react";
import { mediaUrl } from "~/util/mediaUrl";
import { Image } from "~/components/Image";
import classes from './index.module.css';

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
        { movie.poster as Media && (
          <Image
            src={mediaUrl(movie.poster as Media)}
            alt={(movie.poster as Media)?.alt}
            width={316}
            height={412}
          />
        )}
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