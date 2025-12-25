import type { FC } from "react";
import type { IMovie } from "../../models/IMovie.ts";
import { StarsRating } from "../starRating/StarsRating.tsx";
import { GenreBadge } from "../genreBadge/GenreBadge.tsx";
import { genresMap } from "../configs/genres.ts";
import s from "./MovieInfo.module.css";

interface IProps {
    movie: IMovie;
}

export const MovieInfo: FC<IProps> = ({ movie }) => {
    return (
        <div className={s.infoContainer}>
            <h1 className={s.title}>{movie.title}</h1>

            <div className={s.ratingRow}>
                <StarsRating rating={movie.vote_average} />
                <span className={s.releaseDate}>Release: {movie.release_date}</span>
            </div>

            <div className={s.genres}>
                {movie.genre_ids?.map(id => (
                    <GenreBadge key={id} name={genresMap[id] || 'Movie'} />
                ))}
            </div>

            <div className={s.overview}>
                <h3>Overview</h3>
                <p>{movie.overview}</p>
            </div>
        </div>
    );
};