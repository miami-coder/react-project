import s from './MovieListCard.module.css';
import type { IMovie } from "../../models/IMovie.ts";
import type { FC } from "react";
import { Link } from "react-router";
import { StarsRating } from "../starRating/StarsRating.tsx";
import { GenreBadge } from "../genreBadge/GenreBadge.tsx";
import { genresMap } from "../configs/genres.ts";

interface IProps {
    movie: IMovie;
}

export const MovieListCard: FC<IProps> = ({ movie }) => {
    if (!movie) return null;

    const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

    return (
        <div className={s.card}>
            <Link to={`/movies/${movie.id}`} className={s.posterWrapper}>
                <img src={posterUrl} alt={movie.title} className={s.poster} />
                <div className={s.rating}>⭐ {movie.vote_average.toFixed(1)}</div>

                <div className={s.playOverlay}>
                    <span>▶</span>
                </div>
            </Link>

            <div className={s.info}>
                <h4 className={s.title}>{movie.title}</h4>

                <div className={s.extraInfo}>
                    <StarsRating rating={movie.vote_average} />
                </div>

                <div className={s.genres}>
                    {movie.genre_ids?.slice(0, 2).map(id => (
                        <GenreBadge key={id} name={genresMap[id] || 'Movie'} />
                    ))}
                </div>
            </div>
        </div>
    );
};